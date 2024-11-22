from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MenstrualCycle
from .serializers import MenstrualCycleSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

# View to fetch the current phase and cycle events of the user
class currentPhaseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Get the user's cycle data
            cycle_data = MenstrualCycle.objects.get(user=request.user)
            
            # Calculate the current phase using the method on the model
            current_phase = cycle_data.calculate_current_phase()
            
            # Return the current phase (no need for cycle events now)
            return Response({
                'current_phase': current_phase
            }, status=status.HTTP_200_OK)
        

        except MenstrualCycle.DoesNotExist:
            return Response({'error': 'Cycle data not found'}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request):
        data = request.data
        print("Received data:", data)
        
        # Ensure 'last_period_date' is a valid datetime object
        try:
            # Convert last_period_date from string to datetime.date if it's in string format
            last_period_date = datetime.strptime(data['last_period_date'], '%Y-%m-%d').date()
            data['last_period_date'] = last_period_date
        except KeyError:
            return Response({'error': 'Last period date is required'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid date format for last period date. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        data['user'] = request.user.id  # Set the user to the logged-in user
        
        serializer = MenstrualCycleSerializer(data=data)

        if serializer.is_valid():
            # Create or update the menstrual cycle for the user
            cycle_data, created = MenstrualCycle.objects.update_or_create(
                user=request.user,
                defaults={
                    'cycle_length': data['cycle_length'],
                    'period_length': data['period_length'],
                    'last_period_date': data['last_period_date']
                }
            )

            # Perform the phase calculation (make sure the method is available on the model)
            current_phase = cycle_data.calculate_current_phase()

            # Return the success message along with the current phase
            return Response({
                'message': 'Data updated successfully' if not created else 'Data created successfully',
                'current_phase': current_phase
            }, status=status.HTTP_201_CREATED)
        
        print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
