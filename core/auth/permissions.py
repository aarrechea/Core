""" Imports """
from rest_framework.permissions import BasePermission, SAFE_METHODS



""" User permissions """
class UserPermissions(BasePermission):
    def has_object_permission(self, request, view, obj):        
        # safe methods are Get, Options, and Head
        if request.user.is_anonymous:
            return request.method in SAFE_METHODS
        
        if view.basename in ["post"]:
            return bool(request.user and request.user.is_authenticated)
        
        if view.basename in ['post-comment']:
            if request.method in ['DELETE']:
                # superuser or comment author or post author                
                return bool(request.user.is_superuser or request.user in [obj.author, obj.post.author])
            
            return bool(request.user and request.user.is_authenticated)
        
        # Denying access by default
        return False        
    
    
    def has_permission(self, request, view):        
        # safe methods are Get, Options, and Head
        if view.basename in ['post', "post-comment"]:
            if request.user.is_anonymous:
                return request.method in SAFE_METHODS
            
            return bool(request.user and request.user.is_authenticated)
        
        # Denying access by default
        return False
    
    



