from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):

    title = models.CharField(max_length=200)

    source_url = models.URLField()

    ingredients_list = models.TextField()

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="recipes"
    )

    def __str__(self):
        return self.title