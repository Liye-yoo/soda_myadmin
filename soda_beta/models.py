from django.db import models

# Create your models here.
class Information(models.Model):
    name = models.CharField(max_length=20, null=True, blank=True)

    class Meta:
        db_table = 'global_information'
