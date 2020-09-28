from rest_framework import viewsets, permissions
from posts.serializers import PostSerializer, CommentSerializer, ReplySerializer
from posts.models import Post, Comment, Reply


class PostAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentAPI(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class ReplyAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all()