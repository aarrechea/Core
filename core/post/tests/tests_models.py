""" Imports """
import pytest
from core.fixtures.user import user
from core.post.models import Post



""" Test create post """
@pytest.mark.django_db
def test_create_post(user):
    post = Post.objects.create(author=user, body="Test Post body")
    
    assert post.body == "Test Post body"
    assert post.author == user


