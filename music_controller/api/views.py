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

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            # if there is no previous session create a new session

        serializer = self.serializer_class(data=request.data)
        # get the data from the form that contains guest_can_pause and votes_to_skip
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            # GET guest_can_pause and votes_to_skip information from the request
            queryset = Room.objects.filter(host=host) # pylint: disable=maybe-no-member
            # find previous active rooms
            if queryset.exists(): # update old room if found
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else: #create a new room 
                room = Room(host=host, guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)