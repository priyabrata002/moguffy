from django.urls import path
from . import views

urlpatterns = [

path("",views.home,name="home"),

path("search/",views.search,name="search"),

path("library/",views.library,name="library"),

path("liked/",views.liked,name="liked"),

path("playlist/",views.playlist,name="playlist"),

path("like/<int:id>/",views.like_song,name="like_song"),

path("addplaylist/<int:id>/",views.add_playlist,name="add_playlist"),

]