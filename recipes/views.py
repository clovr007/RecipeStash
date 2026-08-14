from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Recipe Stash Backend is Working!")
# Create your views here.
