from typing import List
from pydantic import BaseModel
import json
import logging


class CalendOut(BaseModel):
    dates: List[str]
    topics: List[str]
    holidays: List[str]


class APIList(BaseModel):
    apis: List[dict[str, str]]


def model_to_json(data: BaseModel | List[BaseModel]):
    logging.info(f'Converting {data} to json')
    if isinstance(BaseModel):
        output = data.model_dump()
        logging.info(f'Outputting {output}')
        return output
    elif isinstance(data, list):
        output = []
        for datum in data:
            output.append(datum.model_dump)
        logging.info(f'Outputting {output}')
        return output
