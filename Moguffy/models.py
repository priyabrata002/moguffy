from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)

    audio = models.FileField(upload_to="songs/")
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    video = models.FileField(upload_to="videos/", blank=True, null=True)

    liked = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    songs = models.ManyToManyField(Song, blank=True)

    def __str__(self):
        return f"{self.user.username} playlist"