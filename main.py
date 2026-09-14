from uuid import uuid4
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from database import engine, Database
from schemas import CreateSchema, UpdateSchema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks")
def get_tasks():
    with Session(engine) as session:
        stmt = select(Database)
        result = session.scalars(stmt).all()
        return result

@app.post("/tasks", status_code=status.HTTP_201_CREATED)
def create_task(payload: CreateSchema):
    with Session(engine) as session:
        task = Database(id=str(uuid4()), title=payload.title, description=payload.description, priority=payload.priority)
        session.add(task)
        session.commit()
        session.refresh(task)
        return task

@app.patch("/tasks/{task_id}")
def update_task(task_id: str, payload: UpdateSchema):
    with Session(engine) as session:
        task = session.get(Database, task_id)
        if not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
        if payload.is_completed is not None:
            task.is_completed = payload.is_completed
        if payload.priority is not None:
            task.priority = payload.priority
        if payload.description is not None:
            task.description = payload.description
        if payload.title is not None:
            task.title = payload.title
        session.commit()
        session.refresh(task)
        return task

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str):
    with Session(engine) as session:
        task = session.get(Database, task_id)
        if not task:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
        session.delete(task)
        session.commit()

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)