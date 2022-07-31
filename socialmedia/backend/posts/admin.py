from django.contrib import admin
from .models import Post,PostComment,PostImage,PostLike

# Register your models here.
admin.site.register(Post)
admin.site.register(PostComment)
admin.site.register(PostImage)
admin.site.register(PostLike)
