from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from knox.auth import TokenAuthentication

from posts.serializers import PostSerializer
from posts.models import Post

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
        msg_type = content['type']
        if msg_type == 'POSTING_POST':
            user = getUserFromToken(content['token'], self.knoxAuth)
            post = Post.objects.create(author=user, content=content['content'])
            data = PostSerializer(post).data
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'posted_post',
                    'content': data,
            })
        elif msg_type == 'DELETING_POST':
            user = getUserFromToken(content['token'], self.knoxAuth)
            post = Post.objects.get(pk=content['id'])
            if user == post.author:
                post.delete()
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'deleted_post',
                        'postID': content['id'],
                    }
                )

        elif msg_type == 'EDITING_POST':
            post = Post.objects.get(pk=content['id'])
            user = getUserFromToken(content['token'], self.knoxAuth)
            if user == post.author:
                post.content = content['content']
                post.save()
                post_data = PostSerializer(post).data
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'edited_post',
                        'content': post_data,
                    }
                )


    def posted_post(self, event):
        msg = {
            'type': 'POSTED_POST',
            'content': event['content'],
        }

        self.send_json(content=msg)


    def deleted_post(self, event):
        msg = {
            'type': 'DELETED_POST',
            'content': event['postID'],
        }
        self.send_json(content=msg)

    def edited_post(self, event):
        msg = {
            'type': 'EDITED_POST',
            'content': event['content'],
        }
        self.send_json(content=msg)