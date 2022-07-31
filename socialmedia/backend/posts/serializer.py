from rest_framework import serializers
from .models import Post, PostComment ,PostImage


class PostSerializer(serializers.ModelSerializer):
    class Meta :
        model = Post
        fields= "__all__"

class PostImageSerializer(serializers.ModelSerializer):
    class Meta :
        model = PostImage
        fields= "__all__"

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta :
        model = PostComment
        fields= "__all__"
