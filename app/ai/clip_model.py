import clip
import torch
import requests
from PIL import Image, UnidentifiedImageError
from io import BytesIO

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)


def encode_image_url(url: str):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content)).convert("RGB")
    except (requests.RequestException, UnidentifiedImageError):
        raise ValueError("Invalid image URL. Please provide a direct image link.")

    image = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        emb = model.encode_image(image)

    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()[0]


def encode_text(text: str):
    tokens = clip.tokenize([text]).to(device)

    with torch.no_grad():
        emb = model.encode_text(tokens)

    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()[0]
