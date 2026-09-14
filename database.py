from sqlalchemy import create_engine
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

engine = create_engine('sqlite:///db.db')

class Base(DeclarativeBase):
    pass

class Database(Base):
    __tablename__ = "Todo"
    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=True)
    priority: Mapped[str] = mapped_column(default="medium")
    is_completed: Mapped[bool] = mapped_column(default=False)

Base.metadata.create_all(engine)