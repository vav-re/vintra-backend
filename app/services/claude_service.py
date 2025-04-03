class ClaudeService:
    async def analyze_dimensional(self, transcricao, contexto_paciente=None):
        """
        Método mock para simular análise dimensional
        
        Args:
            transcricao: Texto da transcrição
            contexto_paciente: Contexto opcional do paciente
            
        Returns:
            dict: Resposta mock
        """
        return {
            "raw_response": "Resposta mock do Claude",
            "status": "simulado"
        }