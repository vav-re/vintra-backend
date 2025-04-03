# Primeiro, configurar autenticação
import setup_auth

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import patients, analysis

app = FastAPI(
    title="VINTRA Backend",
    version="1.0.0",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adicionar routers
app.include_router(patients.router, prefix="/api/pacientes", tags=["pacientes"])
app.include_router(analysis.router, prefix="/api/vintra", tags=["analise"])

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API VINTRA", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
