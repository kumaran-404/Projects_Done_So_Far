from django.db import models
from backend.models import Account
# Create your models here.

class Post(models.Model):
    post_id = models.IntegerField(primary_key=True)
    acct_id  = models.ForeignKey(Account,on_delete=models.CASCADE)
    post_type = models.CharField(max_length=1) 
    post_text  =models.CharField(max_length=1000) 
    posted_at = models.DateTimeField(auto_now=True) 


class PostImage(models.Model):
    
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)
    image = models.ImageField(upload_to="posts/",blank=True)
 
        


class PostLike(models.Model):
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)
    liked_by = models.ForeignKey(Account,on_delete=models.CASCADE)
    liked_at  = models.DateTimeField(auto_now_add=True)

class PostComment(models.Model):
    post_id = models.ForeignKey('Post',on_delete=models.CASCADE)
    comment_id = models.IntegerField(primary_key=True)
    commented_by = models.ForeignKey(Account,on_delete=models.CASCADE)
    comment_text = models.TextField(max_length=100)
