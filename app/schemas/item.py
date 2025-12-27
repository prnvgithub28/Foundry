from pydantic import BaseModel

class ItemPayload(BaseModel):
    item_id: str
    description: str
    location: str
    category: str
    report_type: str  # "lost" or "found"
