from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.models.patient import Patient, PatientCreate
from app.services.firestore_service import FirestoreService
from app.services.graph.neo4j_service import Neo4jService

router = APIRouter()

# Dependências
def get_firestore_service():
    return FirestoreService()

def get_neo4j_service():
    return Neo4jService()

@router.post("/", response_model=Patient)
async def create_patient(
    patient: PatientCreate,
    firestore_service: FirestoreService = Depends(get_firestore_service),
    neo4j_service: Neo4jService = Depends(get_neo4j_service)
):
    """Cria um novo paciente no sistema"""
    # Salvar no Firestore
    patient_id = await firestore_service.create_patient(patient.dict())
    
    # Criar nó no Neo4j (apenas metadados não identificáveis)
    safe_metadata = {
        "year_of_birth": patient.data_nascimento.year,
        "gender": patient.genero if patient.genero else "not_specified"
    }
    
    try:
        await neo4j_service.create_patient_node(patient_id, safe_metadata)
    except Exception as e:
        # Erro no Neo4j não deve impedir a criação do paciente
        print(f"Erro ao criar nó de paciente no Neo4j: {e}")
    
    # Recuperar o paciente completo
    patient_data = await firestore_service.get_patient(patient_id)
    return {**patient_data, "id": patient_id}

@router.get("/{patient_id}", response_model=Patient)
async def get_patient(
    patient_id: str,
    firestore_service: FirestoreService = Depends(get_firestore_service)
):
    """Recupera um paciente pelo ID"""
    patient_data = await firestore_service.get_patient(patient_id)
    
    if not patient_data:
        raise HTTPException(status_code=404, detail="Paciente não encontrado")
    
    return {**patient_data, "id": patient_id}