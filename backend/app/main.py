from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router

from app.api.chat import router as chat_router

from app.api.report import router as report_router

from app.api.health import router as health_router

import os

from app.config import (
    UPLOAD_FOLDER,
    REPORT_FOLDER,
    VECTOR_DB_FOLDER
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

os.makedirs(REPORT_FOLDER, exist_ok=True)

os.makedirs(VECTOR_DB_FOLDER, exist_ok=True)

app = FastAPI(
    title="Sensitive Data Detection & Compliance Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    health_router,
    prefix="/api"
)

app.include_router(
    upload_router,
    prefix="/api"
)

app.include_router(
    chat_router,
    prefix="/api"
)

app.include_router(
    report_router,
    prefix="/api"
)

@app.get("/")
def root():

    return {

        "status":"running",

        "application":"Sensitive Data Detection & Compliance Assistant"

    }