from rest_framework import serializers, fields
from posts.models import Post, Comment, Reply


class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = serializers.HyperlinkedRelatedField(
        many=True, 
        view_name='comment-detail',
        read_only=True)
    author = fields.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ['id', 'content', 'created_at',
            'author', 'comments']

    def create(self, validated_data):
        user = self.context['request'].user
        return Post.objects.create(author=user, content=validated_data['content'])


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    replies = serializers.HyperlinkedRelatedField(
        many=True, 
        view_name='reply-detail',
        read_only=True)
    author = fields.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 
            'author', 'replies']


class ReplySerializer(serializers.ModelSerializer):
    author = fields.ReadOnlyField(source='author.username')
    class Meta:
        model = Reply
        fields = ['id', 'content', 'created_at', 'author', 'replies']