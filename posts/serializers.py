from rest_framework import serializers, fields
from posts.models import Post, Comment, Reply



class ReplySerializer(serializers.ModelSerializer):
    author = fields.ReadOnlyField(source='author.username')
    class Meta:
        model = Reply
        fields = ['id', 'content', 'created_at', 'author']

class CommentSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), required=False)
    author = fields.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 
            'author', 'replies', 'post']

    def create(self, validated_data):
        user = self.context['request'].user
        post = validated_data['post']
        return Comment.objects.create(
            author=user, post=post, content=validated_data['content'])

    def update(self, instance, validated_data):
        instance.content = validated_data['content']
        instance.save()
        return instance



class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author = fields.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ['id', 'content', 'created_at',
            'author', 'comments']

    def create(self, validated_data):
        user = self.context['request'].user
        return Post.objects.create(author=user, content=validated_data['content'])




