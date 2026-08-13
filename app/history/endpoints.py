from fastapi import FastAPI, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio.session import AsyncSession
from typing import List
from app.history.models import AuditHistory
from app.history.services import AuditHistoryService
from app.history.repository import ds

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
current_user = OAuth2PasswordBearer(tokenUrl='token')

app = FastAPI()
deploy_service = AuditHistoryService(ds)

@app.get('/api/v1/history', response_model=response_model_list, dependencies=[Depends(current_user)])
def get_audit_records(current_user: str, limit: int = Query(10)):
    response = deploy_service.get_audit_history(limit)
    return Response(content=response, media_type='application/json')

@app.delete('/api/v1/history', dependencies=[Depends(current_user)])
def delete_audit_history(current_user: str, id: int):
    deploy_service.delete_audit_history(id)
    return {'message': 'Audit history deleted successfully'}