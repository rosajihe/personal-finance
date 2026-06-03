from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from typing import List

# Importamos nuestros módulos locales utilizando rutas relativas explícitas
from .database import engine, Base, get_db
from .models import TransactionModel

# Crear las tablas en la base de datos si no existen al arrancar el servidor
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Finanzas Personales con SQLite")

# Habilitar CORS para conectar con JavaScript
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de Pydantic para validar los datos que envía el Frontend (Igual al anterior)
class TransactionSchema(BaseModel):
    description: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)
    type: str
    category: str

    class Config:
        from_attributes = True

@app.get("/")
def read_root():
    return {"status": "online", "database": "SQLite conectada"}

# 🔄 Endpoint GET actualizado para leer desde SQLite
@app.get("/api/transactions")
def get_transactions(db: Session = Depends(get_db)):
    """Obtiene todo el historial desde la base de datos real SQLite"""
    transactions = db.query(TransactionModel).all()
    return transactions

# 🚀 Endpoint POST actualizado para escribir en SQLite
@app.post("/api/transactions")
def create_transaction(transaction: TransactionSchema, db: Session = Depends(get_db)):
    """Valida el JSON, lo transforma en un registro SQL y lo persiste en el disco"""
    db_transaction = TransactionModel(
        description=transaction.description,
        amount=transaction.amount,
        type=transaction.type,
        category=transaction.category
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return {"message": "Transacción guardada en SQLite", "data": db_transaction}
