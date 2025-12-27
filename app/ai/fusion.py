import numpy as np
from app.config import IMAGE_WEIGHT, TEXT_WEIGHT

def fuse_embeddings(image_emb, text_emb):
    fused = IMAGE_WEIGHT * image_emb + TEXT_WEIGHT * text_emb
    fused = fused / np.linalg.norm(fused)
    return fused
