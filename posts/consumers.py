from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from knox.auth import TokenAuthentication

from posts.serializers import PostSerializer, CommentSerializer, ReplySerializer
from posts.models import Post, Comment, Reply

def getUserFromToken(token, knoxAuth):
    return knoxAuth.authenticate_credentials(token.encode('utf-8'))[0]


class LobbyConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.room_group_name = 'lobby'
        self.knoxAuth = TokenAuthentication()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_layer
        )

    def receive_json(self, content, **kwargs):
        self.handle_msg_type(content)


    def handle_msg_type(self, content):
        self.user = getUserFromToken(content['token'], self.knoxAuth)
        msg_type = content['type']
        if msg_type == 'POSTING_POST':
            self.handle_posting_post(content)
        elif msg_type == 'DELETING_POST':
            self.handle_deleting_post(content)
        elif msg_type == 'EDITING_POST':
            self.handle_editing_post(content)
        elif msg_type == 'POSTING_COMMENT':
            self.handle_posting_comment(content)
        elif msg_type == 'DELETING_COMMENT':
            self.handle_deleting_comment(content)
        elif msg_type == 'EDITING_COMMENT':
            self.handle_editing_comment(content)
        elif msg_type == 'POSTING_REPLY':
            self.handle_posting_reply(content)
        elif msg_type == 'DELETING_REPLY':
            self.handle_deleting_reply(content)
        elif msg_type == 'EDITING_REPLY':
            self.handle_editing_reply(content)


    def handle_posting_post(self, content):
        post = Post.objects.create(author=self.user, content=content['content'])
        data = PostSerializer(post).data
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'POSTED_POST',
                'content': data,
        })


    def handle_deleting_post(self, content):
        post = Post.objects.get(pk=content['id'])
        if self.user == post.author:
            post.delete()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'send_event_to_client',
                    'event_type': 'DELETED_POST',
                    'content': content['id'],
                }
            )


    def handle_editing_post(self, content):
        post = Post.objects.get(pk=content['id'])
        if self.user == post.author:
            post.content = content['content']
            post.save()
            post_data = PostSerializer(post).data
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'send_event_to_client',
                    'event_type': 'EDITED_POST',
                    'content': post_data,
                }
            )


    def handle_posting_comment(self, content):
        post = Post.objects.get(pk=content['postID'])
        comment = Comment.objects.create(
            author=self.user, content=content['content'], post=post)
        data = CommentSerializer(comment).data
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'POSTED_COMMENT',
                'content': data,
            })

    def handle_deleting_comment(self, content):
        comment = Comment.objects.get(pk=content['commentID'])
        if self.user != comment.author:
            return
        comment.delete()
        content = {
            'commentID': content['commentID'],
            'postID': content['postID'],
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'DELETED_COMMENT',
                'content': content,
            }
        )

    def handle_editing_comment(self, content):
        comment = Comment.objects.get(pk=content['commentID'])
        if self.user != comment.author:
            return
        comment.content = content['content']
        comment.save()
        data = CommentSerializer(comment).data
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'EDITED_COMMENT',
                'content': data,
            }
        )

    def handle_posting_reply(self, content):
        comment = Comment.objects.get(pk=content['commentID'])
        reply = Reply.objects.create(
            author=self.user, 
            content=content['content'],
            comment=comment)
        replyData = ReplySerializer(reply).data
        content = {
            'replyData': replyData,
            'postID': content['postID']
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'POSTED_REPLY',
                'content': content
            }
        )

    def handle_deleting_reply(self, content):
        reply = Reply.objects.get(pk=content['replyData']['id'])
        if self.user != reply.author:
            return
        reply.delete()
        print(content['replyData'])
        content = {
            'postID': content['postID'],
            'replyData': content['replyData']
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'DELETED_REPLY',
                'content': content,
            }
        )

    def handle_editing_reply(self, content):
        reply = Reply.objects.get(pk=content['replyData']['id'])
        if self.user != reply.author:
            return
        reply.content = content['content']
        reply.save()
        replyData = ReplySerializer(reply).data
        content = {
            'replyData': replyData,
            'postID': content['postID'],
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'send_event_to_client',
                'event_type': 'EDITED_REPLY',
                'content': content,
            }
        )


    def send_event_to_client(self, event):
        msg = {
            'type': event['event_type'],
            'content': event['content'],
        }
        self.send_json(content=msg)