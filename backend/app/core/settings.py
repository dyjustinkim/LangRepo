from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    auth0_domain: str
    auth0_audience: str
    auth0_algorithms: str
    database_host: str
    database_port: str
    database_name: str
    database_user: str
    database_password: str

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql://{self.database_user}:"
            f"{self.database_password}@"
            f"{self.database_host}:"
            f"{self.database_port}/"
            f"{self.database_name}"
        )


    class Config:
        env_file = ".env",
        extra="ignore"

settings = Settings()