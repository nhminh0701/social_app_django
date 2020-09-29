from django.test import TestCase
from django.urls import reverse


TESTED_USER_DATA = {
    "username": "user",
    "email": "email@email.email",
    "password": "password"
}

FAKE_TOKEN = '123abc'

# Create your tests here.
class RegisterTestCase(TestCase):
    def test_register_success(self):
        """
        Successful Register will generate a user instance with a token
        """
        response = self.client.post(reverse("accounts:register"), TESTED_USER_DATA)
        self.assertIsNotNone(response.data["token"])


class LoginTestCase(TestCase):
    def test_login_success(self):
        """
        Successful Login will generate a user instance with a token
        """
        self.client.post(reverse("accounts:register"), TESTED_USER_DATA)
        response = self.client.post(reverse("accounts:login"), {
            "username": TESTED_USER_DATA["username"],
            "password": TESTED_USER_DATA["password"]
        })
        self.assertIsNotNone(response.data["token"])

class UserAPITestCase(TestCase):
    def test_get_user_fail(self):
        """
        Unauthorized Status 401 resulted from invalid token
        """
        response = self.client.get(reverse("accounts:user"), 
            HTTP_AUTHORIZATION=f"Token {FAKE_TOKEN}")
        self.assertEqual(response.status_code, 401)

    def test_get_user_success(self):
        register_response = self.client.post(reverse("accounts:register"), 
            TESTED_USER_DATA)
        token = register_response.json()['token']

        response = self.client.get(reverse("accounts:user"), 
            HTTP_AUTHORIZATION=f"Token {token}")
        self.assertEqual(response.status_code, 200)