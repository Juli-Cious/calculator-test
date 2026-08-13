from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.history.endpoints import router
def create_app():
    app = FastAPI()
    app.include_router(router)
    return app
