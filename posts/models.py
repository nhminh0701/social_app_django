from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.notifier = Notifier.objects.create(
            owner=self.author, post=self)


class Comment(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    post = models.ForeignKey(Post, 
        on_delete=models.CASCADE, related_name='comments')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        notifier = Notifier.objects.create(
            owner=self.author, comment=self)


class Reply(models.Model):
    author = models.ForeignKey(User,
        on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    comment = models.ForeignKey(Comment, 
        on_delete=models.CASCADE, related_name='replies')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        notifier = Notifier.objects.create(
            owner=self.author, reply=self)

    
class Notifier(models.Model):
    owner = models.ForeignKey(User, 
        on_delete=models.CASCADE, related_name='notifications')
    created_at = models.DateTimeField(auto_now_add=True)
    is_checked = models.BooleanField(default=False)
    post = models.OneToOneField(Post, 
        related_name='notifier', null=True, on_delete=models.CASCADE)
    comment = models.OneToOneField(Comment, 
        related_name='notifier', null=True, on_delete=models.CASCADE)
    reply = models.OneToOneField(Reply, 
        related_name='notifier', null=True, on_delete=models.CASCADE)