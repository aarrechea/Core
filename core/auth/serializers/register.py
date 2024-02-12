""" Imports """
from rest_framework import serializers
from core.user.serializer import UserSerializer
from core.user.models import User



""" Register serializer. Registration serializer for requests and user creation """
class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    
    
    class Meta:
        model = User
        fields = ['id', 'bio', 'email', 'username', 'first_name', 'last_name', 'password', 'avatar']
        
    
    # Use the create_user method created before for the user manager to create a new user        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


