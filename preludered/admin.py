from django.contrib import admin
from django import forms

# Register your models here.
from .models import Music, Credits, MusicVideos, Notes


class MusicAdmin(admin.ModelAdmin):
    list_display = ['title', 'track_number', 'libretto_image']
    ordering = ['track_number']


class CreditsAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'admin_image']
    ordering = ['order']


class MusicVideosAdmin(admin.ModelAdmin):
    list_display = ['title', 'order']
    ordering = ['order']

    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super(MusicVideosAdmin, self).formfield_for_dbfield(db_field, **kwargs)
        if db_field.name == 'href':
            formfield.widget = forms.Textarea(attrs=formfield.widget.attrs)
        return formfield


class NotesAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'admin_image']
    ordering = ['order']


admin.site.register(Music, MusicAdmin)
admin.site.register(Credits, CreditsAdmin)
admin.site.register(MusicVideos, MusicVideosAdmin)
admin.site.register(Notes, NotesAdmin)
