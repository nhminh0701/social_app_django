from django.test import TestCase
from django.urls import reverse

# Create your tests here.

class PostTestCase(TestCase):
    def test_list_posts_fail(self):
        """
        Post list required authorization to retrieve data
        """
        response = self.client.get(reverse('posts:post-list'))
        self.assertEqual(response.status_code, 401)