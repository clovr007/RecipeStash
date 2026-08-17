from rest_framework import serializers

from .models import Recipe

from django.contrib.auth.models import User


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe

        fields = [
            'id',
            'title',
            'source_url',
            'ingredients_list',
            'owner',
        ]

        read_only_fields = [
            'owner',
        ]


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            'username',
            'password',
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        return user