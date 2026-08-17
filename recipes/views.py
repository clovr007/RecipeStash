from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Recipe
from .serializers import RecipeSerializer, RegisterSerializer


class RecipeViewSet(viewsets.ModelViewSet):

    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]
    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return Recipe.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):

        serializer.save(
            owner=self.request.user
        )
class RegisterView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    'message': 'User created successfully'
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )