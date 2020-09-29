from rest_framework import viewsets, permissions
from posts.serializers import PostSerializer, CommentSerializer, ReplySerializer
from posts.models import Post, Comment, Reply


class PostAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all().reverse()


class CommentAPI(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all().reverse()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ReplyAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all().reverse()