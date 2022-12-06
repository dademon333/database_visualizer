import os

POSTGRESQL_USER = os.getenv('POSTGRESQL_USER', 'postgres')
POSTGRESQL_HOST = os.getenv('POSTGRESQL_HOST', 'localhost')
POSTGRESQL_PORT = os.getenv('POSTGRESQL_PORT', '5433')
POSTGRESQL_PASSWORD = os.getenv('POSTGRESQL_PASSWORD', 'password')
POSTGRESQL_DATABASE = os.getenv('POSTGRESQL_DATABASE', 'corevision')

REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')

POSTGRESQL_URL = (
    f"postgresql+asyncpg://{POSTGRESQL_USER}:{POSTGRESQL_PASSWORD}@"
    f"{POSTGRESQL_HOST}:{POSTGRESQL_PORT}/{POSTGRESQL_DATABASE}"
)
