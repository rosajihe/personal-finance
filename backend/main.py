from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="API de Finanzas Personales")

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🛠️ NUEVO: Modelo de Pydantic para validar los datos que envía el Frontend
class Transaction(BaseModel):
    description: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)  # El monto debe ser mayor a 0
    type: str  # "income" o "expense"
    category: str

# Base de datos temporal en memoria
transactions_db = [
    {"id": 1, "description": "Salario", "amount": 2500.0, "type": "income", "category": "Trabajo"},
    {"id": 2, "description": "Supermercado", "amount": 120.5, "type": "expense", "category": "Comida"},
    {"id": 3, "description": "Suscripción Streaming", "amount": 15.0, "type": "expense", "category": "Entretenimiento"}
]

@app.get("/")
def read_root():
    return {"status": "online"}

@app.get("/api/transactions")
def get_transactions():
    return transactions_db

# 🚀 NUEVO: Endpoint POST para recibir y almacenar nuevas transacciones
@app.post("/api/transactions")
def create_transaction(transaction: Transaction):
    """Recibe un JSON del frontend, lo valida y lo guarda en la base de datos"""
    # Convertir el objeto validado a un diccionario normal de Python
    new_tx = transaction.model_dump()
    
    # Generar un ID de forma dinámica para el registro
    new_tx["id"] = len(transactions_db) + 1
    
    # Guardar en nuestra lista (Base de datos temporal)
    transactions_db.append(new_tx)
    
    return {"message": "Transacción registrada con éxito", "data": new_tx}
