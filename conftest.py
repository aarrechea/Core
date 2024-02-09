""" Imports """
import pytest
from rest_framework.test import APIClient



""" Api client test fixture """
@pytest.fixture
def client():
    return APIClient()




