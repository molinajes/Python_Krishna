from django.shortcuts import render, get_object_or_404

from .models import Music, Notes, Credits, MusicVideos

import random


def index(request):
    auto_play = request.session.get('auto_play', 1)
    request.session['auto_play'] = 0

    return render(request, 'preludered/index.html',
                  {'body_class': 'preludered', 'auto_play': auto_play})


def nav_prelude_red(request):
    return render(request, 'preludered/nav-prelude-red.html')


def nav_libretto(request, track):
    music = Music.objects.order_by('track_number')
    data = {
        'music': music,
        'start_track': track
    }
    return render(request, 'preludered/nav-libretto.html', data)


def nav_notes(request):
    notes = Notes.objects.order_by('order')
    data = {
       'notes': notes,
       'start_pos': random.randrange(notes.count() + 1)
    }
    return render(request, 'preludered/nav-notes.html', data)


def nav_credits(request):
    credits = Credits.objects.order_by('order')
    return render(request, 'preludered/nav-credits.html', {'credits': credits})


def nav_music_videos(request):
    music_videos = MusicVideos.objects.order_by('order')
    return render(request, 'preludered/nav-music-videos.html', {'music_videos': music_videos})
