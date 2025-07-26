import sys
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

transcript = sys.argv[1]  # input text

# Load mentor data
with open('models/mentors.json', 'r') as f:
    mentors = json.load(f)

model = SentenceTransformer('all-MiniLM-L6-v2')

mentee_vector = model.encode([transcript])

scores = []
for mentor in mentors:
    mentor_vector = model.encode([mentor["bio"]])
    similarity = cosine_similarity([mentee_vector[0]], [mentor_vector[0]])[0][0]
    scores.append((mentor["name"], similarity, mentor["bio"]))

best_match = max(scores, key=lambda x: x[1])
print(json.dumps({
    "mentor_name": best_match[0],
    "similarity": round(best_match[1], 3),
    "bio": best_match[2]
}))
