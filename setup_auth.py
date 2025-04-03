import os
import json

# GCP Authentication
def setup_gcp_auth():
    credentials_content = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_CONTENT')
    
    if credentials_content:
        os.makedirs(os.path.expanduser('~/.config/gcloud'), exist_ok=True)
        credentials_path = os.path.expanduser('~/.config/gcloud/application_default_credentials.json')
        
        with open(credentials_path, 'w') as f:
            f.write(credentials_content)
        
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path
        print(f"Credenciais GCP configuradas em: {credentials_path}")
    else:
        print("AVISO: Credenciais GCP não encontradas!")

# Neo4j Authentication check
def check_neo4j_auth():
    required_vars = ['NEO4J_URI', 'NEO4J_USERNAME', 'NEO4J_PASSWORD']
    missing = [var for var in required_vars if not os.environ.get(var)]
    
    if missing:
        print(f"AVISO: Variáveis Neo4j ausentes: {', '.join(missing)}")
    else:
        print("Credenciais Neo4j encontradas")

if __name__ == "__main__":
    setup_gcp_auth()
    check_neo4j_auth()