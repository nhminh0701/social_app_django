from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from knox.auth import TokenAuthentication

def getUserFromToken(token, knoxAuth, consumer):
    consumer.user = knoxAuth.authenticate_credentials(token.encode('utf-8'))[0]


class LobbyConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'lobby'
        self.knoxAuth = TokenAuthentication()

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_layer
        )

    async def receive_json(self, content, **kwargs):
        await sync_to_async(getUserFromToken)(content['token'], self.knoxAuth, self)

        print(self.user)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': content['type'],
                'content': content['content'],
        })


    async def post_post(self, event):
        msg = {
            'type': 'POSTED_POST',
            'content': event['content'],
            'user': self.user.username,
        }

        await self.send_json(content=msg)