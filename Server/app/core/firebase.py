import os
import json
from firebase_admin import credentials, firestore, initialize_app
from dotenv import load_dotenv

load_dotenv()

firebasej = os.getenv("FIREBASE_SERVICE_ACCOUNT")

if not firebasej:
    raise RuntimeError("FIREBASE_SERVICE_ACCOUNT env var not set")

cred = credentials.Certificate(json.loads(firebasej))
initialize_app(cred)
db = firestore.client()

