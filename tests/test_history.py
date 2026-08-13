from app.main import create_app
debugging = True
import pytest
from typing import List
from app.history.services import get_audit_history
from fastapi.testclient import TestClient

@pytest.fixture
def client():
    yield from _client()

@pytest.fixture
def _client():
    app = create_app()
    client = TestClient(app)
    yield client

def test_get_audit_records(client):  # noqa: F841
    response = client.get('/api/v1/history', headers={'Authorization': 'Bearer token'})
    assert response.status_code == 200
    records = response.json()['audit_records']
    assert len(records) == 10
    assert records[0]['event'] == 'Event 1'
    assert records[-1]['id'] == 10

    response = client.get('/api/v1/history', headers={'Authorization': 'Bearer token'}, query_params={'limit': 20})
    records = response.json()['audit_records']
    assert len(records) == 20

def test_delete_audit_records(client):  # noqa: F841
    pass
