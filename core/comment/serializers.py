""" Imports """
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core.abstract.serializers import AbstractSerializer
from core.user.models import User
from core.user.serializer import UserSerializer
from core.comment.models import Comment
from core.post.models import Post



""" Comment serializer """
class CommentSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    post = serializers.SlugRelatedField(queryset=Post.objects.all(), slug_field='public_id')
    
    
    # Every model serializer provides an instance attribute that holds the object that will be
    # modified if there is a delete, put, or patch request. If this is a get or post request,
    # this attribute is set to None.
    def validate_post(self, value):
        if self.instance:
            return self.instance.post
        
        return value
    
    
    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True                        
        
        instance = super().update(instance, validated_data)
        
        return instance
    
        
    # Blocking users from creating comments for other users
    def validate_author(self, value):        
        if self.context["request"].user != value:
            raise ValidationError("You can't create a post for another user.")
        return value
    
    
    # Modifies the final objcect by adding information about the author
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep['author'])
        rep['author'] = UserSerializer(author).data
        
        return rep
    
    
    class Meta:
        model = Comment
        
        # List of all the fields that ca be included in a request or a response
        fields = ['id', 'post', 'author', 'body', 'edited', 'created', 'updated']
        read_only_fields = ['edited']



