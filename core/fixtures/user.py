""" Imports """
import pytest
from core.user.models import User



""" User and superuser data fixture """
data_user = {
    'username':'test_user',
    'email':'test@gmail.com',
    'first_name':'Test',
    'last_name':'User',
    'password':'test_password'
}

data_superuser = {
    'username':'test_superuser',
    'email':'testsuperuser@gmail.com',
    'first_name':'Test',
    'last_name':'Superuser',
    'password':'test_password'
}



""" Create user fixture """
@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(**data_user)

