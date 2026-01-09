import os
import json
from firebase_admin import credentials, firestore, initialize_app


firebase_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

if not firebase_json:
    raise RuntimeError("FIREBASE_SERVICE_ACCOUNT env var not set")

cred = credentials.Certificate(json.loads(firebasej))
initialize_app(cred)
db = firestore.client()
