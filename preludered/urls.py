from django.conf.urls import url
from . import views

app_name = 'preludered'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nav/prelude-red$', views.nav_prelude_red, name='nav_prelude_red'),
    url(r'^nav/libretto/(?P<track>[0-9]+)$', views.nav_libretto, name='nav_libretto'),
    url(r'^nav/notes$', views.nav_notes, name='nav_notes'),
    url(r'^nav/credits$', views.nav_credits, name='nav_credits'),
    url(r'^nav/music-videos$', views.nav_music_videos, name='nav_music_videos')
]
