import argparse
import logging
import boto3
from botocore.exceptions import ClientError
import requests
from app.core.settings import settings
from PyPDF2 import PdfReader
from io import BytesIO

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region
                         )
bucket_name = settings.bucket_name

def generate_presigned_url(client_method, key, expires_in, cont_type=None):
    try:
        method_parameters = {
            "Bucket": bucket_name,
            "Key": key,
        }
        if cont_type:
            method_parameters["ContentType"] = cont_type
        url = s3_client.generate_presigned_url(
            ClientMethod=client_method, Params=method_parameters, ExpiresIn=expires_in
        )
    except ClientError:
        raise
    return url

def delete_file(key: str):
    s3_client.delete_object(
        Bucket=bucket_name,
        Key=key
    )

def read_doc(key: str) -> bytes:
    response = s3_client.get_object(Bucket=bucket_name, Key=key)
    pdf_bytes = response["Body"].read() 
    reader = PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text




  

