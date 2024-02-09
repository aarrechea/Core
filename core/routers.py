""" Imports """
#from rest_framework import routers
from rest_framework_nested import routers
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.auth.viewsets.register import RegisterViewSet
from core.comment.viewsets import CommentViewSet
from core.post.viewsets import PostViewSet
from core.user.viewsets import UserViewSet



""" Router declaration """
router = routers.SimpleRouter()



""" User """
router.register(r'user', UserViewSet, basename='user')



""" Auth """
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')



""" Post """
router.register(r'post', PostViewSet, basename='post')

# lookup is the regex variable that matches an instance of the parent resource, 
# in this case post_pk
posts_router = routers.NestedSimpleRouter(router, r'post', lookup='post')
posts_router.register(r'comment', CommentViewSet, basename='post-comment')



""" Patterns """
urlpatterns = [
    *router.urls,
    *posts_router.urls
]


