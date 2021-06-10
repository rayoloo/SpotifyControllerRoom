from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

# for endpoints such as /home /"whatever"


def main(request):
    return HttpResponse("Hello")