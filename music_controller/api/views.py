from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() # pylint: disable=maybe-no-member
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    #Handle Post Request
    
    def post(self, request, format=None):
        # 1. Check if a session key already exist if not then create a new session key
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # 2. Get the data from the Post Request
        serializer = self.serializer_class(data=request.data)
        # 3a. If it is valid then extract the corresponding fields 
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            # 4. Check if user has a old room
            queryset = Room.objects.filter(host=host) # pylint: disable=maybe-no-member
            if queryset.exists(): # 4a. If the user has a old room, update it with the new parameters
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else: #4b. Else create a new room with the new parameters
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        # 3b. Response with a Bad Request status code
        return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)