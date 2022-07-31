from distutils.cmd import Command
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post, PostComment ,PostImage, PostLike 
from backend.models import Account ,Follows ,Profile

# Create your views here.
from .serializer import PostCommentSerializer, PostImageSerializer, PostSerializer 
from backend.serializer import profileSerializer
def generateId():
    import random 
    while True :
        num =random.randint(100000,1000000) 
        cnt = Post.objects.filter(post_id=num).count()
        if(cnt==0) :
            return num 

@api_view(['POST','GET']) 

def post(request):
    account_number = request.session["user"]
    post_type =request.data["type"] 
    post_id = generateId() 
    post_text= request.data["text"]
    account_obj = Account.objects.get(account_id=account_number)
    a=Post(acct_id=account_obj,post_type=post_type,post_id=post_id,post_text=post_text)
    a.save()
    count = len(request.data)-2
    for i in range(count):
        img = request.data["image"+str(i)]
        b = PostImage(post_id=a)
        b.image = img 
        b.save()
        
    return Response({"data":"hi"}) 


def get_followings_id(a):
    followings =[]
    obj = Follows.objects.filter(account_id = a)
    for i in obj:
        followings.append(i.following_id.account_id)
    return followings

def get_post_images(post_id):
    obj = PostImage.objects.filter(post_id=post_id)
    images =[]
    for i in obj :
        images.append(i.image.url)
    return images 

def get_post_likes(post_id):
    obj =PostLike.objects.filter(post_id=post_id)
    likes=[]
    for i in obj :
        likes.append(i.liked_by.account_name)
        #need to insert profile pic 
    return likes 

def get_post_comments(post_id):
    obj =PostComment.objects.filter(post_id=post_id)
    comments=[]
    for i in obj :
        data =PostCommentSerializer(i).data 
        commented_by = data.pop("commented_by")
        obj = Account.objects.get(account_id=commented_by)
        data['commented_by'] = obj.account_name 
        #profile pic has to be inserted here!!
        comments.append(data)
    return comments


def give_accountname(acct_id):
    obj =Account.objects.filter(account_id=acct_id)[0]
    return obj.account_name 

def give_profilepic(acct_id):
    obj =Profile.objects.filter(account_id =acct_id)[0]
    if(obj.profile_pic==""):
        return ""
    else :
        return obj.profile_pic.url 
    
def isLike(post_id,acct_id):
    num = PostLike.objects.filter(post_id=post_id,liked_by=acct_id).count()
    return num!=0


def get_post_data(a,acct_id):
    from datetime import datetime
    post_data=[]
    for i in a:
        obj =Post.objects.filter(acct_id=i)
        if(len(obj)!=0):
            
            for i in obj:
                k=dict()
                data =PostSerializer(i).data 
                k["post_time"] = data.pop("posted_at")
                k['post_time']=datetime.strptime(k['post_time'], '%Y-%m-%dT%H:%M:%S.%fZ')
                data["already_liked"] = isLike(data["post_id"],acct_id)
                k["post_data"] =data
                k['post_images'] = get_post_images(data['post_id']) 
                k['post_likes'] = get_post_likes(data['post_id'])
                k['post_comments'] = get_post_comments(data['post_id'])
                k["posted_by"] = give_accountname(k["post_data"]["acct_id"])
                k["profile_pic"] =give_profilepic(k["post_data"]["acct_id"])
                post_data.append(k)
    post_data =sorted(post_data,key=lambda i:i['post_time'],reverse=True) 
    return post_data
  

@api_view(['POST','GET'])
def get_post(request):
    #foolower's data
    if(request.session.get("user") is not None):
        followings_id = get_followings_id(request.session["user"])
        posts = get_post_data(followings_id,request.session["user"])
        print((posts))
        return Response((posts))
    else:
        print("no user found")
        return Response({"hello":"bye"})

@api_view(['POST','GET'])
def like(request,*args, **kwargs):
    action = kwargs["action"]
    user_obj =Account.objects.get(account_id=request.session["user"])
    post_obj = Post.objects.get(post_id=request.data["post_id"])
    
    if(action=="like"):
        obj =PostLike(post_id=post_obj,liked_by=user_obj)
        obj.save()
        return Response({})
    else :
        obj =PostLike.objects.filter(post_id=post_obj,liked_by=user_obj)
        obj.delete()
        return Response({})


def generatePostId():
    import random 

    while(True):
        num =random.randint(100000,9999999)
        count = PostComment.objects.filter(comment_id=num).count()
        if count==0 :
            return num 


@api_view(['POST','GET'])

def comment(request,*args, **kwargs):
    action = kwargs["action"]
    print(action)
    post_id =request.data["post_id"]
    post_obj = Post.objects.get(post_id=post_id)

   
    


    if(action=="post"):
        comment_text = request.data["comment_text"] 
        user_obj =Account.objects.get(account_id=request.session["user"])
        comment_obj = PostComment(post_id=post_obj,commented_by=user_obj,comment_text=comment_text,comment_id=generatePostId())
        comment_obj.save()
    elif(action=='delete'):
        comment_id = request.data['id']
        obj = PostComment(comment_id=comment_id)
        obj.delete()

 
    comments= PostComment.objects.filter(post_id=post_obj)
 
    output=[]
    for i in comments:
        obj =PostCommentSerializer(i).data 
        a=obj["commented_by"]
        a= Account.objects.get(account_id=a) 
        obj["commented_by"] = a.account_name 
        output.append(obj)

 
    

    return Response({"data":output}) 

 



def give_me_array(obj,str):

    result_array =[]
    if(str=='image'):
        for i in obj:
            data =PostImageSerializer(i).data 
            result_array.append(data) 
    elif(str=='comment'):
        for i in obj:
            data =PostCommentSerializer(i).data 
            person = data['commented_by'] 
            acct_obj = Account.objects.get(account_id=person)
            data['commented_by']= acct_obj.account_name
            result_array.append(data) 
    else :
        if(len(obj)):
            for i in list(obj):
                user = i.liked_by.account_id 
                acct_obj = Account.objects.get(account_id=user)
                profile_obj = profileSerializer(Profile.objects.get(account_id=acct_obj)).data
                result_array.append({'name':acct_obj.account_name,'profile_pic':profile_obj['profile_pic']})
    return  result_array 

@api_view(['POST','GET']) 

def own_posts(request,*args, **kwargs):
    action =kwargs['action']
    if(action=='others'):
        user = request.data['user']
    else :
        user = request.session["user"]
    account_obj = Account.objects.get(account_id=user) 

    post_obj = Post.objects.filter(acct_id=account_obj)

    data =[] 

    for i in post_obj :

        p ={}
        p['post_info'] = PostSerializer(i).data 
        img_obj = PostImage.objects.filter(post_id=i)
        like_obj =PostLike.objects.filter(post_id=i)
        comment_obj=PostComment.objects.filter(post_id=i)
        p['image']=give_me_array(img_obj,'image')
        p['likes']=give_me_array(like_obj,'like')
        p['comments']=give_me_array(comment_obj,'comment')
        data.append(p)
  
    return Response({'data':data})

