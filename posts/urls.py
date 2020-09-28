from django.urls import path
from rest_framework import routers
from posts.api import PostAPI, CommentAPI, ReplyAPI

app_name = 'posts'

router = routers.SimpleRouter()
router.register(r'posts', PostAPI)
router.register(r'comments', CommentAPI)
router.register(r'replies', ReplyAPI)

urlpatterns = router.urls