import boto3
import json
import re

from botocore.exceptions import ClientError
from app.core.settings import settings


bedrock = boto3.client(
    "bedrock-runtime", 
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region)

def call_bedrock(document):
    prompt = """
    Given the below document, extract the appropriate information (question and comprehensive answer)
    required to produce flashcards. Then, output the information following the below format EXACTLY:

    Format:
        {
        "flashcards": [
            {
            "question": "What is evaporation?",
            "answer": "The process where liquid water turns into vapor."
            },
            {
            "question": "What is condensation?",
            "answer": "The process where water vapor cools and becomes liquid."
            }
        ]
        }



    Document:
    
    """
    
    check = "Double check to make the sure format is a valid json and contains all required fields."



    request_body = {
        'messages': [
            {
                'role': 'user',
                'content': [{'text': prompt + document + check}]
            }
        ],
        'inferenceConfig': {
            'maxTokens': 1024,
            'temperature': 0.7
        }
    }

    response = bedrock.invoke_model(
        modelId='us.amazon.nova-2-lite-v1:0',
        body=json.dumps(request_body)
    )

    response_body = json.loads(response['body'].read())
    content_list = response_body["output"]["message"]["content"]
    text_block = next((item for item in content_list if "text" in item), None)

    if text_block is not None:
        clean = re.sub(r"```json|```", "", text_block["text"]).strip()
        try: 
            return json.loads(clean)
        except json.JSONDecoreError: 
            return "Error: Failed to call bedrock"

    return "Error: Failed to call bedrock"




