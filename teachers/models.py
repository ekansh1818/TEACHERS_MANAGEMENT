from django.db import models

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    dob = models.DateField()
    num_classes = models.IntegerField()

    def __str__(self):
        return self.name
