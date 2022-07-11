from typing import List
from pydantic import BaseModel, Field

class Movie(BaseModel):
    title: str
    description:str
    actors:List
    embed:str

class Search(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    description:str
    actors:List
    embed:str
