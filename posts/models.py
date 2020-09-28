from django.db import models
from django.contrib.auth.models import User


class Notifier(models.Model):
    owner = models.ForeignKey(User, 
        on_delete=models.CASCADE, related_name='notifications')
    created_at = models.DateTimeField(auto_now_add=True)
    is_checked = models.BooleanField()

class Post(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    notifier = models.OneToOneField(Notifier, 
        on_delete=models.CASCADE, related_name='post')


class Comment(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    notifier = models.OneToOneField(Notifier, 
        on_delete=models.CASCADE, related_name='comment')
    post = models.ForeignKey(Post, 
        on_delete=models.CASCADE, related_name='comments')


class Reply(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    notifier = models.OneToOneField(Notifier, 
        on_delete=models.CASCADE, related_name='reply')
    comment = models.ForeignKey(Comment, 
        on_delete=models.CASCADE, related_name='replies')