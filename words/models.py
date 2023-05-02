from django.db import models


class List(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    language = models.CharField(max_length=20)


class Word(models.Model):
    list = models.ForeignKey('List', on_delete=models.CASCADE)
    word = models.CharField(max_length=100)
    translation = models.CharField(max_length=100)
    status = models.CharField(max_length=15, default='new')