from google.cloud import firestore
import datetime

class FirestoreService:
    def __init__(self):
        self.client = firestore.Client()
    
    async def create_patient(self, patient_data):
        """
        Cria um documento de paciente no Firestore
        
        Args:
            patient_data: Dados do paciente
            
        Returns:
            str: ID do paciente criado
        """
        # Adicionar timestamp
        patient_data["data_criacao"] = datetime.datetime.now()
        
        # Criar documento
        doc_ref = self.client.collection("pacientes").document()
        doc_ref.set(patient_data)
        
        return doc_ref.id
    
    async def get_patient(self, patient_id):
        """
        Recupera um paciente pelo ID
        
        Args:
            patient_id: ID do paciente
            
        Returns:
            dict: Dados do paciente
        """
        doc_ref = self.client.collection("pacientes").document(patient_id)
        doc = doc_ref.get()
        
        if doc.exists:
            return doc.to_dict()
        return None
    
    async def create_session(self, patient_id, session_data):
        """
        Cria uma sessão para um paciente
        
        Args:
            patient_id: ID do paciente
            session_data: Dados da sessão
            
        Returns:
            str: ID da sessão criada
        """
        # Adicionar timestamp e referência ao paciente
        session_data["data"] = datetime.datetime.now()
        session_data["paciente_id"] = patient_id
        
        # Criar documento
        doc_ref = self.client.collection("sessoes").document()
        doc_ref.set(session_data)
        
        return doc_ref.id
    
    async def store_dimensional_analysis(self, session_id, analysis_data):
        """
        Armazena análise dimensional VINTRA
        
        Args:
            session_id: ID da sessão
            analysis_data: Dados da análise dimensional
            
        Returns:
            str: ID da análise
        """
        # Adicionar timestamp e referência à sessão
        analysis_data["data_criacao"] = datetime.datetime.now()
        analysis_data["sessao_id"] = session_id
        
        # Criar documento
        doc_ref = self.client.collection("analises_vintra").document()
        doc_ref.set(analysis_data)
        
        return doc_ref.id