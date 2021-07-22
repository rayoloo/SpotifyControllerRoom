from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all() # pylint: disable=maybe-no-member
    serializer_class = RoomSerializer

