# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-13 03:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('preludered', '0004_auto_20171112_2012'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='musicvideos',
            name='embed',
        ),
        migrations.AddField(
            model_name='musicvideos',
            name='href',
            field=models.CharField(default='', max_length=500),
        ),
    ]