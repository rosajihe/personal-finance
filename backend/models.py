from sqlalchemy import Column, Integer, String, Float
from .database import Base

class TransactionModel(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Float)
    type = Column(String)  # "income" o "expense"
    category = Column(String)
