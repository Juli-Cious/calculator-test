from fastapi.responses import Response
from pydantic import BaseModel
from sqlalchemy.ext.asyncio.session import AsyncSession
from app.history.models import AuditHistory
from app.history.repository import ds

token_schema = TokenBase
response_model_list = List[AuditHistory]

class AuditHistoryService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_audit_history(self, limit: int = 10):
        return await self.db.query(AuditHistory).limit(limit).all()

    async def delete_audit_history(self, id: int):
        return await self.db.query(AuditHistory).filter(AuditHistory.id == id).delete()
