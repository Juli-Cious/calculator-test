from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.history.models import AuditHistory

SQLALCHEMY_DATABASE_URL = 'sqlite:///audit_history.db'
engine = create_engine(SQLALCHEMY_DATABASE_URL)

db = declarative_base()
ds = sessionmaker(autocommit=False, autoflush=False, bind=engine)

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

def delete_db():
    db.drop_all()
    db.create_all()
