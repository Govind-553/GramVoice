import sys
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

transcript = sys.argv[1]
language = sys.argv[2] if len(sys.argv) > 2 else 'hi'

# Load mentors
with open('models/mentors.json', 'r', encoding='utf-8') as f:
    mentors = json.load(f)

# Filter mentors by language
filtered_mentors = [m for m in mentors if m.get('language') == language]

if not filtered_mentors:
    print(json.dumps({
        "mentor_name": None,
        "similarity": 0,
        "bio": "No mentor found for the selected language."
    }))
    sys.exit(0)

model = SentenceTransformer('all-MiniLM-L6-v2')
mentee_vector = model.encode([transcript])

scores = []
for mentor in filtered_mentors:
    mentor_vector = model.encode([mentor["bio"]])
    similarity = cosine_similarity([mentee_vector[0]], [mentor_vector[0]])[0][0]
    scores.append((mentor["name"], similarity, mentor["bio"]))

best_match = max(scores, key=lambda x: x[1])
print(json.dumps({
    "mentor_name": best_match[0],
    "similarity": float(round(best_match[1], 3)),  
    "bio": best_match[2]
}))

