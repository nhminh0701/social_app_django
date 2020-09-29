from django.test import TestCase
from django.urls import reverse
from posts.models import Notifier, Post
from django.contrib.auth.models import User


TESTED_USER_DATA = {
    "username": "user",
    "email": "email@email.email",
    "password": "password"
}

class PostTestCase(TestCase):
    def test_list_posts_fail(self):
        """
        Post list required authorization to retrieve data
        """
        response = self.client.get(reverse('posts:post-list'))
        self.assertEqual(response.status_code, 200)

    def test_post_model_created_with_notifier(self):
        self.client.post(reverse("accounts:register"), TESTED_USER_DATA)
        token = self.client.post(reverse("accounts:login"), {
            "username": TESTED_USER_DATA["username"],
            "password": TESTED_USER_DATA["password"]
        }).json()['token']

        userData = self.client.get(reverse("accounts:user"), 
            HTTP_AUTHORIZATION=f"Token {token}").json()

        user = User.objects.get(pk=userData['id'])
        self.assertIsNotNone(user)
        
        testData = {
            'content': 'Test content',
        }

        data = self.client.post(reverse("posts:post-list"), 
            data=testData,
            HTTP_AUTHORIZATION=f"Token {token}").json()
        notifier = Notifier.objects.get(post=Post.objects.get(pk=data['id']))
        self.assertIsNotNone(notifier)

    def test_delete_post_along_notifier(self):
        self.client.post(reverse("accounts:register"), TESTED_USER_DATA)
        token = self.client.post(reverse("accounts:login"), {
            "username": TESTED_USER_DATA["username"],
            "password": TESTED_USER_DATA["password"]
        }).json()['token']

        userData = self.client.get(reverse("accounts:user"), 
            HTTP_AUTHORIZATION=f"Token {token}").json()

        user = User.objects.get(pk=userData['id'])
        
        testData = {
            'content': 'Test content',
        }

        data = self.client.post(reverse("posts:post-list"), 
            data=testData,
            HTTP_AUTHORIZATION=f"Token {token}").json()
        notifier_id = Notifier.objects.get(post=Post.objects.get(pk=data['id'])).pk
        self.client.delete(reverse("posts:post-detail", 
            kwargs={'pk': user.pk}), HTTP_AUTHORIZATION=f"Token {token}")
        self.assertEqual(Post.objects.filter(pk=data['id']).count(), 0)
        self.assertEqual(Notifier.objects.filter(pk=notifier_id).count(), 0)