from django.db import models

# Create your models here.


class Music(models.Model):
    track_number = models.IntegerField(default=0)
    title = models.CharField(max_length=255, default='')
    image = models.FileField(upload_to='public/uploads/', default='')

    def libretto_image(self):
        return '<img src="/static/%s" height="100" />' % self.image

    libretto_image.allow_tags = True

    class Meta:
        verbose_name = 'Music'
        verbose_name_plural = 'Music'


class Notes(models.Model):
    image = models.FileField(upload_to='public/uploads/', default='')
    title = models.CharField(max_length=255, default='')
    order = models.IntegerField(default=0)

    def admin_image(self):
        return '<img src="/static/%s" height="100" />' % self.image

    admin_image.allow_tags = True

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'


class Credits(models.Model):
    order = models.IntegerField(default=0)
    image = models.FileField(upload_to='uploads/', default='')
    title = models.CharField(max_length=255, default='')

    def admin_image(self):
        return '<img src="/static/%s" height="100" />' % self.image

    admin_image.allow_tags = True

    class Meta:
        verbose_name = 'Credits'
        verbose_name_plural = 'Credits'


class MusicVideos(models.Model):
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=255, default='')
    href = models.CharField(max_length=500, default='')

    class Meta:
        verbose_name = 'Music Video'
        verbose_name_plural = 'Music Videos'
