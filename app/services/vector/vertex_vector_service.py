import os
import vertexai
import numpy as np
from google.cloud import aiplatform
from vertexai.preview.language_models import TextEmbeddingModel

class VertexVectorService:
    def __init__(self):
        # Inicializar VertexAI
        project_id = os.getenv('GCP_PROJECT_ID')
        location = os.getenv('GCP_REGION', 'us-central1')
        
        vertexai.init(project=project_id, location=location)
        self.embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@001")
        
    async def create_dimensional_embedding(self, dimensional_analysis, session_text):
        """
        Cria embedding vetorial combinando análise dimensional com texto da sessão
        
        Args:
            dimensional_analysis: Análise dimensional (dict com valores v1-v10)
            session_text: Texto da sessão (transcrição)
            
        Returns:
            dict: Embedding criado e metadados
        """
        # Criar texto combinado com valores dimensionais
        dim_text = f"""
        Análise dimensional VINTRA:
        - Valência Emocional (v1): {dimensional_analysis.get('v1', 0)}
        - Excitação Emocional (v2): {dimensional_analysis.get('v2', 0)}
        - Dominância Emocional (v3): {dimensional_analysis.get('v3', 0)}
        - Intensidade Afetiva (v4): {dimensional_analysis.get('v4', 0)}
        - Complexidade Sintática (v5): {dimensional_analysis.get('v5', 0)}
        - Coerência Narrativa (v6): {dimensional_analysis.get('v6', 0)}
        - Flexibilidade Cognitiva (v7): {dimensional_analysis.get('v7', 0)}
        - Dissonância Cognitiva (v8): {dimensional_analysis.get('v8', 0)}
        - Perspectiva Temporal Passado (v9_past): {dimensional_analysis.get('v9_past', 0)}
        - Perspectiva Temporal Presente (v9_present): {dimensional_analysis.get('v9_present', 0)}
        - Perspectiva Temporal Futuro (v9_future): {dimensional_analysis.get('v9_future', 0)}
        - Autocontrole (v10): {dimensional_analysis.get('v10', 0)}
        
        Resumo da sessão: {session_text[:1000]}  # Limitado a 1000 caracteres
        """
        
        # Obter embedding do texto
        embedding = self.embedding_model.get_embeddings([dim_text])[0].values
        
        # Normalizar embedding
        norm = np.linalg.norm(embedding)
        if norm > 0:
            normalized_embedding = [float(val / norm) for val in embedding]
        else:
            normalized_embedding = embedding
        
        return {
            "embedding": normalized_embedding,
            "dimensions": len(normalized_embedding),
            "created_at": aiplatform.utils.timestamp_pb2.Timestamp().GetCurrentTime().ToJsonString()
        }
    
    # Aqui iriam métodos para integração com Vertex Vector Search
    # Para um MVP completo, precisaríamos implementar:
    # - Criação de índice vetorial
    # - Inserção de embeddings no índice
    # - Consulta de similaridade