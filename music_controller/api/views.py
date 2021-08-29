from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here
# Backend EndPoint

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() # pylint: disable=maybe-no-member
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    
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
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else: #4b. Else create a new room with the new parameters
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        # 3b. Response with a Bad Request status code
        return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)

class GetRoom(APIView):
    serializer_class = RoomSerializer
    url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code) # pylint: disable=maybe-no-member
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room Not Found':'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request':'Room code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    kwarg = "code"
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        code = request.data.get(self.kwarg)
        if code != None:
            rooms = Room.objects.filter(code=code) # pylint: disable=maybe-no-member
            if len(rooms) > 0:
                self.request.session['room_code'] = code
                return Response({"message":"Room Joined"}, status=status.HTTP_200_OK)
            else:
                return Response({"message":"Room Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"Bad Request":"Invalid Post Data"}, status=status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()  

        data = {
            'code' : self.request.session.get('room_code')
        }

        return JsonResponse(data ,status=status.HTTP_200_OK)    

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            rooms = Room.objects.filter(host=host_id) # pylint: disable=maybe-no-member 
            if len(rooms) > 0:
                room = rooms[0]
                room.delete()
                
        return Response({'Message':'Success'}, status=status.HTTP_200_OK)