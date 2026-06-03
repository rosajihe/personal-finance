from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Indicamos el nombre del archivo de base de datos local que se creará automáticamente
SQLALCHEMY_DATABASE_URL = "sqlite:///./finance.db"

# El argumento 'check_same_thread' es exclusivo y necesario para SQLite en FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Función auxiliar (Dependencia) para abrir y cerrar la conexión por cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
