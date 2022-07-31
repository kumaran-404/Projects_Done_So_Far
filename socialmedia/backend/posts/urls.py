from django.urls import path 
from .views import post,get_post,like,comment,own_posts 

urlpatterns = [
    path("",post),
    path("get/",get_post),
    path("likes/<str:action>/",like),
    path("comment/<str:action>/",comment),
    path("ownpost/<str:action>/",own_posts)
]
