from rest_framework import serializers
from .models import MenstrualCycle

class MenstrualCycleSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenstrualCycle
    fields = ['cycle_length', 'period_length', 'last_period_date']