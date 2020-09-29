from django.contrib import admin
from posts.models import *


# Register your models here.
@admin.register(Notifier)
class NotifierAdmin(admin.ModelAdmin):
    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    pass