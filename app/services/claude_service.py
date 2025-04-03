import os
import vertexai
from vertexai.language_models import TextGenerationModel

class ClaudeService:
    def __init__(self):
        # Inicializar Vertex AI
        project_id = os.getenv('GCP_PROJECT_ID')
        location = os.getenv('GCP_REGION', 'us-central1')
        
        # Inicializar Vertex AI
        vertexai.init(project=project_id, location=location)
        
        # Carregar modelo Claude
        self.model = TextGenerationModel.from_pretrained("claude-3-sonnet@20240229")
    
    async def analyze_dimensional(self, transcription, patient_context=None):
        """
        Analisa uma transcrição para extrair dados dimensionais VINTRA
        
        Args:
            transcription: A transcrição textual
            patient_context: Contexto opcional do paciente
            
        Returns:
            dict: Análise dimensional VINTRA
        """
        # Construir prompt para análise dimensional
        prompt = self._build_dimensional_prompt(transcription, patient_context)
        
        # Chamar Claude via Vertex AI
        response = self.model.predict(prompt=prompt, max_output_tokens=8192)
        
        # Processar resposta
        # Aqui precisará ser implementada a lógica de extração dos valores dimensionais da resposta
        return {"raw_response": response.text}
    
    def _build_dimensional_prompt(self, transcription, patient_context):
        """Constrói prompt para análise dimensional"""
        # Prompt simplificado - será expandido conforme necessário
        prompt = f"""
        Você é um assistente clínico especializado no modelo VINTRA (Visualização INtegrativa TRAjetorial).
        
        Analise a seguinte transcrição de acordo com as 10 dimensões do VINTRA:
        
        # Dimensões Emocionais:
        - v₁: Valência Emocional (-5 a +5)
        - v₂: Excitação Emocional (0-10)
        - v₃: Dominância Emocional (0-10)
        - v₄: Intensidade Afetiva (0-10)
        
        # Dimensões Cognitivas:
        - v₅: Complexidade Sintática (0-10)
        - v₆: Coerência Narrativa (0-10)
        - v₇: Flexibilidade Cognitiva (0-10)
        - v₈: Dissonância Cognitiva (0-10)
        
        # Dimensões de Autonomia:
        - v₉: Perspectiva Temporal [passado, presente, futuro] (cada um 0-10)
        - v₁₀: Autocontrole (0-10)
        
        Transcrição: "{transcription}"
        
        Forneça valores para cada dimensão (v₁-v₁₀) nas escalas apropriadas com breve justificativa.
        Inclua também uma síntese narrativa (ipsissima) e uma formulação integrativa do caso.
        """
        
        if patient_context:
            prompt += f"\nContexto adicional do paciente: {patient_context}"
            
        return prompt