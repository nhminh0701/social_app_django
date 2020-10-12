from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from knox.auth import TokenAuthentication

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
        user = getUserFromToken(content['token'], self.knoxAuth)

        print(user)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': content['type'],
                'content': content['content'],
                'user': user.username,
        })


    def post_post(self, event):
        msg = {
            'type': 'POSTED_POST',
            'content': event['content'],
            'user': event['user'],
        }

        self.send_json(content=msg)