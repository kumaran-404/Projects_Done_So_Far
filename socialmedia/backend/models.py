from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.db.models.fields import related
from django.utils.timezone import now

# Create your models here.


class Account(models.Model):
    account_id =models.IntegerField(primary_key=True)
    first_name =models.CharField(max_length=30,null=True)
    last_name =models.CharField(max_length=30,null=False)
    account_name =models.CharField(max_length=45,unique=True,null=False)
    is_active =models.BooleanField(default=True)
    is_private =models.BooleanField(default=False)
    email = models.EmailField(unique=True ,null=False) 
    phone =models.BigIntegerField(null=False)
    password =models.CharField(max_length=8,null=False)
    joined_datetime = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    account_id= models.ForeignKey('Account',on_delete=models.CASCADE)
    follower_no =models.IntegerField(default=0)
    following_no =models.IntegerField(default=0)
    profile_pic =models.ImageField(upload_to='profile_pictures',blank=True)
    about =models.TextField(max_length=100)
    post_count  =  models.IntegerField(default=0)

class  Follows(models.Model):
    account_id = models.ForeignKey('Account',on_delete=models.CASCADE,related_name="user_id")
  
    following_id =models.ForeignKey('Account',on_delete=models.CASCADE,related_name="follower_id")
    since  = models.DateField(auto_now_add=True)


