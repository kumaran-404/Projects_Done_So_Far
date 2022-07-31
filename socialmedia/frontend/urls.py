from django.urls import path 
from . import views
urlpatterns = [
    path("",views.home),
    path("profile/",views.home),
    path("signup/",views.home),
    path("createprofile/",views.home),
    path("notifications/",views.home),
    path("explore/",views.home),
    path("explore/<str:user_id>",views.home),
    path("<str>/",views.home)

]
