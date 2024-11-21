from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MenstrualCycle
from .serializers import MenstrualCycleSerializer


# Create your views here.

class currentPhaseView(APIView):
  def get(self, request):
    try:
      cycle_data = MenstrualCycle.objects.get(user = request.user)
      current_phase = cycle_data.calculate_current_phase()
      return Response ({'current_phase': current_phase}, status = status.HTTP_200_OK)
    
    except MenstrualCycle.DoesNotExist:
      return Response ({'error' :'Cycle data not found'}, status= status.HTTP_404_NOT_FOUND)

class PostMenstrualCycleView(APIView):
   def post(self, request):
      data = request.data
      data['user'] = request.user.id
      serializer = MenstrualCycleSerializer(data = data)

      if serializer.is_valid():
         cycle_data, created = MenstrualCycle.objects.update_or_create(
            user = request.user,
            defaults = {
               'cycle_length' : data['cycle_length'],
               'period_length': data['period_length'],
               'last_period_date': data['last_period_date']}
         )
         return Response({'message': 'Data updated successfully' if not created else 'Data created successfully'},status=status.HTTP_201_CREATED)
   
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


