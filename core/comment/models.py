""" Imports """
from django.db import models
from core.abstract.models import AbstractManager, AbstractModel



""" Comment manager """
class CommentManager(AbstractManager):
    pass



""" Comment model """
class Comment(AbstractModel):
    post = models.ForeignKey('core_post.Post', on_delete=models.PROTECT)
    author = models.ForeignKey('core_user.User', on_delete=models.PROTECT)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    
    objects = CommentManager()
    
    
    def __str___(self):
        return self.author.name


