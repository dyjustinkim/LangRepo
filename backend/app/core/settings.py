from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    auth0_domain: str
    auth0_audience: str
    auth0_algorithms: str
    database_host: str
    database_port: str
    database_name: str
    database_user: str
    database_password: str
    bucket_name: str
    aws_region: str

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql://{self.database_user}:"
            f"{self.database_password}@"
            f"{self.database_host}:"
            f"{self.database_port}/"
            f"{self.database_name}"
        )

settings = Settings()