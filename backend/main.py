from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Finanzas Personales")

# Habilitar CORS para que tu JavaScript (Frontend) pueda comunicarse con Python (Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite peticiones desde cualquier origen en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base de datos temporal en memoria (Lista de diccionarios)
transactions_db = [
    {"id": 1, "description": "Salario", "amount": 2500.0, "type": "income", "category": "Trabajo"},
    {"id": 2, "description": "Supermercado", "amount": 120.5, "type": "expense", "category": "Comida"},
    {"id": 3, "description": "Suscripción Streaming", "amount": 15.0, "type": "expense", "category": "Entretenimiento"}
]

@app.get("/")
def read_root():
    return {"status": "online", "message": "API de Finanzas Personales Activa"}

@app.get("/api/transactions")
def get_transactions():
    """Obtiene el historial de ingresos y gastos"""
    return transactions_db