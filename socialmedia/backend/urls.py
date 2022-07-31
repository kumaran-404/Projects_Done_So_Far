from django.urls import path
from django.urls.conf import include 
from .views import signup,login,islogin ,logout ,profile ,changeprofile ,fetchnames, wholeprofile,follow ,getfollowings ,getfollowers,unfollow
urlpatterns = [
   path("signup/",signup),
   path("login/",login),
   path("islogin/",islogin),
   path("logout/",logout),
   path("profile/",profile),
   path("changeprofile/",changeprofile),
   path("fetchnames/",fetchnames),
   path("wholeprofile/",wholeprofile),
   path("follow/",follow),
   path("unfollow/",unfollow),
   path("getfollowings/",getfollowings) ,
   path("getfollowers/",getfollowers),
   path("post/",include('backend.posts.urls')),

]

