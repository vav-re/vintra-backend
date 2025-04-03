from fastapi import APIRouter, Depends, HTTPException, Form
from typing import Dict, Optional

from app.services.claude_service import ClaudeService
from app.services.firestore_service import FirestoreService
from app.services.graph.neo4j_service import Neo4jService
from app.services.vector.vertex_vector_service import VertexVectorService
from app.models.dimensional_analysis import DimensionalAnalysis

router = APIRouter()

# Dependências
def get_claude_service():
    return ClaudeService()

def get_firestore_service():
    return FirestoreService()

def get_neo4j_service():
    return Neo4jService()

def get_vector_service():
    return VertexVectorService()

@router.post("/analisar/{sessao_id}")
async def analisar_sessao(
    sessao_id: str,
    transcricao: str = Form(...),
    contexto_paciente: Optional[str] = Form(None),
    claude_service: ClaudeService = Depends(get_claude_service),
    firestore_service: FirestoreService = Depends(get_firestore_service),
    neo4j_service: Neo4jService = Depends(get_neo4j_service),
    vector_service: VertexVectorService = Depends(get_vector_service)
):
    """Realiza análise dimensional VINTRA de uma transcrição"""
    
    # Chamar Claude para análise dimensional
    analise_raw = await claude_service.analyze_dimensional(transcricao, contexto_paciente)
    
    # Aqui precisaríamos de um parser para extrair os valores dimensionais da resposta do Claude
    # Por enquanto, vamos usar valores de exemplo:
    dimensional_values = {
        "v1": -2.5,
        "v2": 7.0,
        "v3": 3.0,
        "v4": 8.0,
        "v5": 6.0,
        "v6": 5.0,
        "v7": 4.0,
        "v8": 7.0,
        "v9_past": 7.0,
        "v9_present": 3.0,
        "v9_future": 2.0,
        "v10": 4.0,
        "sintese_narrativa": "Extração da síntese seria feita do resultado do Claude",
        "formulacao_integrativa": "Formulação integrativa seria extraída do resultado do Claude",
        "recomendacoes": ["Recomendação 1", "Recomendação 2", "Recomendação 3"],
        "trajetoria": {"tendencia": "declinante", "velocidade": 0.7},
        "raw_response": analise_raw.get("raw_response", "")
    }
    
    # Armazenar no Firestore
    analysis_id = await firestore_service.store_dimensional_analysis(sessao_id, dimensional_values)
    
    # Criar nó de estado dimensional no Neo4j
    try:
        node_id = await neo4j_service.create_dimensional_state(sessao_id, dimensional_values)
        print(f"Nó dimensional criado com ID: {node_id}")
    except Exception as e:
        print(f"Erro ao criar nó dimensional no Neo4j: {e}")
    
    # Criar embedding vetorial
    try:
        embedding = await vector_service.create_dimensional_embedding(
            dimensional_values, 
            transcricao
        )
        print(f"Embedding criado com {embedding['dimensions']} dimensões")
        # Aqui usaríamos Vertex Vector Search para armazenar o embedding
    except Exception as e:
        print(f"Erro ao criar embedding: {e}")
    
    # Retornar análise dimensional
    return {
        "id": analysis_id,
        "sessao_id": sessao_id,
        **dimensional_values
    }