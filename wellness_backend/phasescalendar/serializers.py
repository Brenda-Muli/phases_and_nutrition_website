from rest_framework import serializers
from .models import MenstrualCycle

class MenstrualCycleSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenstrualCycle
    fields = ['cycle_length', 'period_length', 'last_period_date']

  def validate_cycle_length(self, value):
    if value < 28 or value > 30:
        raise serializers.ValidationError("Cycle length must be between 28 and 30 days.")
    return value

def validate_period_length(self, value):
    if value <= 0:
        raise serializers.ValidationError("Period length must be a positive number.")
    return value