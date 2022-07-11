from model import Search
from bson.objectid import ObjectId

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.Movie
collection = database.movies

async def fetch_all_movies():
    movies = []
    cursor = collection.find({})
    async for document in cursor:
        document["_id"] = str(document.get("_id"))
        movies.append(Search(**document))
    return movies

async def create_movie(movie):
    document = movie
    result = await collection.insert_one(document)
    return document

async def update_movie(id, title, description, actors, embed):
    await collection.update_one({"_id":id},
    {"$set":{
        "title":title,
        "description":description,
        "actors":actors,
        "embed":embed
    }})
    document = await collection.find_one({"_id":id})
    return document

async def remove_movie(id):
    newID = ObjectId(id)
    await collection.delete_one({"_id":newID})
    return True