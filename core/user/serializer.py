""" Imports """
from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.user.models import User
from CoreRootProject import settings



""" User serializer """
class UserSerializer(AbstractSerializer):    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL                            
            return representation
        
        # if debug is enabled for dev
        if settings.DEBUG: 
            request = self.context.get('request')
            representation['avatar'] = request.build_absolute_uri(representation['avatar'])            
            return representation
    
    
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'bio', 'email',
                  'is_active', 'created', 'updated', 'avatar']
        read_only_field = ['is_active']




