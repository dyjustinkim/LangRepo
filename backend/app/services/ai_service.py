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
    required to produce flashcards. Only extract the most relevant information, or what you judge should 
    correspond to clear words and definitions, NOT every single word in the document.
    Then, output the information following the below format EXACTLY:

    Format/examples (Do not include these sample flashcards in answer):
        {
        "flashcards": [
            {
            "question": "Plural"
            "answer": "Containing several elements"
            },
            {
            "question": "开始",
            "answer": "To start/begin"
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
        except json.JSONDecodeError: 
            return "Error: Failed to call bedrock"

    return "Error: Failed to call bedrock"




