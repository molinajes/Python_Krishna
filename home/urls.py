from django.conf.urls import url
from . import views

app_name = 'home'
urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^works$', views.works, name='works'),
    url(r'^live$', views.live, name='live'),
    url(r'^connect$', views.connect, name='connect')
]
