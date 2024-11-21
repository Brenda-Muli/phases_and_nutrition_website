from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class MenstrualCycle(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE)
  cycle_length = models.IntegerField()
  period_length = models.IntegerField()
  last_period_date = models.DateField()

  def __str__(self):
    return f'{self.user} Menstrual Cycle'

  def calculate_current_phase(self):
    today = timezone.now().date()
    days_since_last_period = (today - self.last_period_date).days
    cycle_day = days_since_last_period % self.cycle_length

    if cycle_day < self.period_length:
      return 'Menstrual'
    
    elif cycle_day < self.cycle_length -14:
      return 'Follicular'
    
    elif cycle_day < self.cycle_length - 7:
      return 'Ovulatory'

    else:
      return 'luteal'