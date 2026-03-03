from fastapi import HTTPException, status
import requests
from jose import jwt, jwk
from app.core.settings import settings

class VerifyToken():

    def __init__(self, permissions=None, scopes=None):
        self.permissions = permissions
        self.scopes = scopes
        jwks_url = f'https://{settings.auth0_domain}/.well-known/jwks.json'
        self.jwks = requests.get(jwks_url).json()

    def get_public_key(self, token):
        headers = jwt.get_unverified_header(token)
        kid = headers["kid"]
        key_data = next(k for k in self.jwks["keys"] if k["kid"] == kid)
        key = jwk.construct(key_data)
        return key
    
    def verify(self, token:str):
        try:
            self.signing_key = self.get_public_key(token)
        except Exception as e:
            return {"status": "error", "msg": str(e)}

        try: 
            payload = jwt.decode(
                token,
                self.signing_key,
                algorithms=[settings.auth0_algorithms],
                audience=settings.auth0_audience,
                issuer=f"https://{settings.auth0_domain}/"
            )

        except Exception as e:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
            )

        return payload
