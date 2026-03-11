from django.shortcuts import render, redirect, get_object_or_404
from .models import Song, Playlist
from django.contrib.auth.decorators import login_required

def home(request):
    songs = Song.objects.all()
    return render(request, "Moguffy/home.html", {"songs": songs})

def search(request):
    query = request.GET.get("q")
    songs = Song.objects.filter(title__icontains=query) if query else Song.objects.all()
    return render(request, "Moguffy/search.html", {"songs": songs})

def library(request):
    songs = Song.objects.all()
    return render(request, "Moguffy/library.html", {"songs": songs})

def liked(request):
    songs = Song.objects.filter(liked=True)
    return render(request, "Moguffy/liked.html", {"songs": songs})

def like_song(request, id):
    song = get_object_or_404(Song, id=id)
    song.liked = not song.liked
    song.save()
    return redirect("home")

@login_required
def playlist(request):
    playlist, created = Playlist.objects.get_or_create(user=request.user)
    songs = playlist.songs.all()
    return render(request, "Moguffy/playlist.html", {"songs": songs})

@login_required
def add_playlist(request, id):
    song = get_object_or_404(Song, id=id)
    playlist, created = Playlist.objects.get_or_create(user=request.user)
    playlist.songs.add(song)
    return redirect("home")