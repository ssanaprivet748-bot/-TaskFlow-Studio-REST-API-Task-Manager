from pydantic import BaseModel, ConfigDict

class TaskSchema(BaseModel):
    id: str
    title: str
    description: str | None = None
    priority: str = "medium"
    is_completed: bool
    model_config = ConfigDict(from_attributes=True)

class CreateSchema(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"

class UpdateSchema(BaseModel):
    is_completed: bool | None = None
    priority: str | None = None
    description: str | None = None
    title: str | None = None