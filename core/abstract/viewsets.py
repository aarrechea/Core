""" Imports """
from rest_framework import viewsets, filters



""" Abstract viewset """
class AbstractViewSet(viewsets.ModelViewSet):
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated', 'created'] # ordering parameters when a request is made
    ordering = ['-updated'] # tell REST in which order to send many objects as a response
    
    


