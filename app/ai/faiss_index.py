import faiss
import numpy as np

DIM = 512

index = faiss.IndexFlatIP(DIM)
id_map = []


def add_vector(vector, item_id):
    vector = np.array([vector]).astype("float32")
    index.add(vector)
    id_map.append(item_id)


def search_vectors(query_vector, top_k):
    if index.ntotal == 0:
        return [], []

    query_vector = np.array([query_vector]).astype("float32")
    scores, indices = index.search(query_vector, top_k)

    results = []
    for idx, score in zip(indices[0], scores[0]):
        if idx < len(id_map):
            results.append({
                "item_id": id_map[idx],
                "score": float(score)
            })

    return results
