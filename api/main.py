from typing import Union

from fastapi import FastAPI
from database import conn
from postulants.postulants import hello_world
app = FastAPI()


@app.get("/")
    hello_world()

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}