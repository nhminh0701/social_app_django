from rest_framework import viewsets, permissions
from posts.serializers import PostSerializer, CommentSerializer, ReplySerializer
from posts.models import Post, Comment, Reply


class PostAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all().reverse()


class CommentAPI(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Comment.objects.all().reverse()
        postID = self.request.query_params.get('post', None)
        if postID is not None:
            queryset = queryset.filter(post=postID)
        return queryset


class ReplyAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ReplySerializer
    queryset = Reply.objects.all().reverse()