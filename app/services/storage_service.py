from google.cloud import storage
from config.settings import GCP_PROJECT_ID, STORAGE_BUCKET_NAME

class StorageService:
    def __init__(self):
        self.client = storage.Client(project=GCP_PROJECT_ID)
        self.bucket = self.client.bucket(STORAGE_BUCKET_NAME)
    
    async def upload_file(self, file_content, destination_blob_name):
        """
        Uploads a file to the storage bucket
        
        Args:
            file_content: The file content to upload
            destination_blob_name: The name to give the file in the bucket
            
        Returns:
            str: The public URL of the uploaded file
        """
        blob = self.bucket.blob(destination_blob_name)
        blob.upload_from_string(file_content)
        
        return blob.public_url
    
    async def download_file(self, source_blob_name):
        """
        Downloads a file from the storage bucket
        
        Args:
            source_blob_name: The name of the file in the bucket
            
        Returns:
            bytes: The file content
        """
        blob = self.bucket.blob(source_blob_name)
        return blob.download_as_bytes()