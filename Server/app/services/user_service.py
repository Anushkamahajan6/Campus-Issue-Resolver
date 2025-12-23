from app.core.firebase import db

def get_or_create_user(user):
    uid = user["uid"]
    email = user.get("email")

    ref = db.collection("users").document(uid)
    doc = ref.get()

    if not doc.exists:
        # default role = student
        ref.set({
            "email": email,
            "role": "student"
        })

    return ref.get().to_dict()
