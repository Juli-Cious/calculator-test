from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditHistory(BaseModel):
    id: int
    event: str
    timestamp: datetime
    user_id: int
    username: Optional[str]