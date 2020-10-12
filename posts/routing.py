from django.urls import re_path

from posts import consumers

websocket_urlpatterns = [
    re_path(r'ws\/lobby\/$', consumers.LobbyConsumer),
]