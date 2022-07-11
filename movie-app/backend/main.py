from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Movie


app = FastAPI();

from database import (
    fetch_all_movies,
    create_movie, 
    update_movie, 
    remove_movie, 
    )

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def get_all_movies():
    response = await fetch_all_movies()
    if response:
        return response

@app.post("/", response_model=Movie)
async def post_movie(movie:Movie):
    response = await create_movie(movie.dict())
    if response: 
        return response
    raise HTTPException(400, "Something went wrong.")

@app.put("/{id}", response_model=Movie)
async def put_movie(id, title:str, description:str, actors:str, embed:str):
    response = await update_movie(id, title, description, actors, embed)
    if response:
        return response
    raise HTTPException(404, f"Cannot find movie with id: {id}")

@app.delete("/{id}")
async def delete_movie(id):
    response = await remove_movie(id)
    if response:
        return response
    raise HTTPException(404, f"Cannot find movie with id: {id}")