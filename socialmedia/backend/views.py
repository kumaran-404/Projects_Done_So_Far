import re
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import fields, status
from .models import Account, Follows,Profile 

from .serializer import profileSerializer,AccountSerializer,AccountViewSerializer
from django.forms import model_to_dict
from django.apps import apps 

@api_view(['POST','GET'])
def islogin(request,*args, **kwargs):
    
    if(request.method=='GET') :
        return Response(status=status.HTTP_404_NOT_FOUND)
    if(request.session.get("user") is not None):
        return Response({"logined":"yes"})
    else :
        return Response({"logined":"no"})

def create_random_name(fname,lname):
    from random import randint
    while(True): 
        name =fname+"_"+lname + "__"+str("".join([str(randint(0,9)) for i in range(3)]))     
        if Account.objects.filter(account_name=name).count()==0 :
            return name 

def create_unique_acct_id():
    from random import randint 
    while(True):
        num   =randint(1000000,9999999)
        obj =Account.objects.filter(account_id =num )
        if(obj.count()==0):
            return num 


def fake_id():
    import names 
    gender="male"
    for i in range(1,101):
        from random import randint 
        if i==50:
            gender="female"
        name =  names.get_full_name(gender=gender).split(" ")
        first_name = name[0]
        last_name =name[1]
        phone = randint(9000000000,9999999999)
        email = name[0]+name[1]+"123@gmail.com"
        account_name =create_random_name(first_name,last_name)
        account_id = create_unique_acct_id()
        
        a=Account(first_name=first_name,last_name=last_name,phone=phone,email=email,password="password",account_name=account_name,account_id=account_id)
        a.save()
        b=Profile(account_id=a)
        b.save()


@api_view(['POST','GET'])
def signup(request):
    if(request.method=="GET"):
        return Response(status=status.HTTP_404_NOT_FOUND)
    phone_number =request.data["phone"]
    email =request.data["email"]
    if(Account.objects.filter(phone=phone_number).count()==1 and  Account.objects.filter(email=email).count()==1 ):
        return Response({"message":"unsuccessfull"})
    else :
        first_name =request.data["firstname"]
        last_name =request.data["lastname"]
        password =request.data["password"]
        email =request.data["email"]
        phone =request.data["phone"]
        account_name=create_random_name(first_name,last_name)
        account_id = create_unique_acct_id()
        a=Account(first_name=first_name,last_name=last_name,phone=phone,email=email,password=password,account_name=account_name,account_id=account_id)
        a.save()
        b=Profile( account_id=a)
        b.save()
        request.session["user"]=account_id 
        return Response({"message":"successful"})

@api_view(['POST','GET'])
def login(request):
    if(request.method=="GET"):
        return Response(status=status.HTTP_404_NOT_FOUND)
    else :
        email = request.data['email']
        password =request.data["password"]
        if(authenticate(email=email,password=password)):
            k= AccountSerializer(Account.objects.get(email=email))
            acct_id = k.data["account_id"]
            request.session["user"]= acct_id     
            print(request.session["user"])
            return Response({"message":"successfull"})
        if(user_exists(email=email)):
            return Response({"message":"unsuccessfull","user":"exists"})
        return Response({"message":"unsuccessfull","user":"doesn't exist"})
        
def user_exists(email):
    if(Account.objects.filter(email=email).count()==1):
        return True 
    else :
        return False 
def authenticate(**kwargs):
    email =kwargs["email"]
    password =kwargs["password"]
    if(Account.objects.filter(email=email,password=password).count()==1):
        return True 
    else :
        return False 

@api_view(['POST'])
def logout(request):
    del request.session["user"]
    return Response({"logout":1})






@api_view(['POST','GET',])
def profile(request):

    if(request.session.get("user") is not None):
        try:
            obj = Account.objects.filter(account_name = request.data["data"])[0]
            name = obj.account_name 
            id=  obj.account_id 
            obj = Profile.objects.filter(account_id=id)[0]
            data = profileSerializer(obj).data 
            data["account_name"] = name  
            return Response(data,status=status.HTTP_200_OK)
        except:
            a=Profile.objects.get(account_id=request.session["user"])
            data  =profileSerializer(a).data 
            b =Account.objects.get(account_id =request.session["user"])
            data ["account_name"] = b.account_name 
            return Response(data)
    else :
        return Response({})

@api_view(['POST','GET',])
def changeprofile(request):
    print(request.data)
    obj = Account.objects.get(account_id=request.session["user"])
    obj.account_name = request.data["account_name"]
    obj.save()
    
    prof_obj =Profile.objects.get(account_id=request.session['user'])
    prev_image =prof_obj.profile_pic 
    prev_image.delete()
    prof_obj.about =request.data["bio"]
    prof_obj.profile_pic =request.data["profile_pic"]
    print(request.data["profile_pic"])
    prof_obj.save()
    return Response({},status=status.HTTP_100_CONTINUE)

    
         
@api_view(['POST','GET'])
def fetchnames(request):
    import json 
    u =Account.objects.all()
    data =AccountViewSerializer(u,many=True).data 
    t  =  json.loads(json.dumps(data))

    for i in range(len(t)):
        t[i]["profile_pic"]=str(Profile.objects.get(account_id=int(t[i]["account_id"])).profile_pic)
 
    return Response({"details":t},status=status.HTTP_200_OK)

@api_view(['POST',"GET"])
def wholeprofile(request):
    acct_name = request.data["account_name"]
    acct_obj =Account.objects.filter(account_name= acct_name)
    if(acct_obj.count()==1):
        acct_obj = acct_obj[0]

        acct_id  =acct_obj.account_id
        obj =  Profile.objects.get(account_id= acct_id) 
        prof_data = profileSerializer(obj).data 
        is_Following = Follows.objects.filter(account_id=request.session["user"],following_id=acct_id).count() 
        prof_data["is_following"] =is_Following
        
        obj = Account.objects.get(account_id=request.session["user"])
        name = obj.account_name 
        if(name==acct_name) :
            prof_data["is_same"] = True 
        else:
            prof_data["is_same"] = False 
        return Response(prof_data)
    
    else :
        return Response({"data":"not found"})
        
        


@api_view(['POST','GET'])

def follow(request):
    user_id = request.session["user"]
    follower_name = request.data["follower_name"]
    
    user_obj = Account.objects.filter(account_name = follower_name)[0]
    follower_id = user_obj.account_id 
    obj = Account.objects.get(account_id=user_id)
    obj2= Account.objects.get(account_id=follower_id )
    follower_obj =Follows(account_id=obj,following_id=obj2)
    follower_obj.save()
    #updating follwer and following number 
    user_profile =Profile.objects.get(account_id = user_id)
    user_profile.following_no+=1
    follower_profile =Profile.objects.get(account_id= follower_id)
    follower_profile.follower_no +=1
    #saving instances
    user_profile.save()
    follower_profile.save()
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST',"GET"])
def unfollow(request) :
    following_name = request.data["account_name"] 
    following_obj  = Account.objects.filter(account_name=following_name)[0]
    following_id = following_obj.account_id 
    f_obj = Profile.objects.get(account_id=following_id) 
    f_obj.follower_no-=1 
    f_obj.save()
    user_profile = Profile.objects.get(account_id=request.session["user"])
    user_profile.following_no -=1 
    user_profile.save()
    Follows.objects.filter(account_id=request.session["user"],following_id=following_id).delete() 
    return Response({"data":"hi"})

@api_view(['POST','GET'])
def getfollowings(request):
    data =Follows.objects.filter(account_id = request.session["user"])
    b=[]
    for i in data :
        
        profile_pic=Profile.objects.filter(account_id=i.following_id.account_id)[0].profile_pic 
        a=list((i.following_id.account_id,i.following_id.account_name,str(profile_pic)))
        b.append(a)
    return Response({"data":b})

@api_view(['POST','GET']) 
def getfollowers(request):
    data = Follows.objects.filter(following_id=request.session["user"])
    b= []
    print(request.session["user"])
    for i in data:
        profile_pic   = Profile.objects.filter(account_id= i.account_id.account_id)[0].profile_pic
     
        a= list((i.account_id.account_id,i.account_id.account_name,str(profile_pic)))
        b.append(a)
    return Response({"data":b})





