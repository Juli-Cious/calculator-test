from fastapi import FastAPI

app = FastAPI(title="Mini Calculator")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
