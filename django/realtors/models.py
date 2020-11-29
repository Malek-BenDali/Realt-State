from django.db import models
from datetime import datetime

class Realtor(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photo/%Y/%m/%d/')#organiser folder current year folder current month folder current day
    description = models.TextField(blank=True)#La description peut être vide
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    top_seller = models.BooleanField(default=False)
    date_hired = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name