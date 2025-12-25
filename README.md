🎓 Campus Issue Resolver (AI-Powered)

An AI-driven campus complaint management system that allows students to report campus issues using text and images, while enabling administrators to automatically classify, prioritize, and resolve complaints efficiently using multimodal AI.

🚀 Overview

Traditional campus complaint systems are:

Manual

Text-only

Slow and reactive

Campus Issue Resolver modernizes this process by integrating AI + cloud technologies, making issue reporting faster, clearer, and more actionable.

✨ Key Features
👩‍🎓 Student Side

🔐 Secure authentication

📝📷 Complaint submission using text + images

🧠 AI-generated structured complaint descriptions

📊 Complaint tracking and status updates

🧑‍💼 Admin Side

🗂 Automatic complaint categorization

⚡ Faster issue understanding using AI

🔎 Centralized complaint dashboard

🛠 Status updates and resolution management

🧠 AI Capabilities

Multimodal Understanding
AI analyzes both image and text together

Automatic Issue Classification
(e.g., sanitation, infrastructure, electricity, safety)

Structured Data Generation
Converts unstructured inputs into clean complaint records

🏗 System Architecture

Flow:

Student (Web / Mobile App)
        ↓
Frontend (React)
        ↓
Backend API (FastAPI)
        ↓
Firebase (Auth + Firestore + Storage)
        ↓
Gemini AI (Text + Image Analysis)
        ↓
Admin Dashboard

🧰 Tech Stack
Frontend

⚛️ React

🎨 Tailwind CSS

Backend

🐍 FastAPI

🔐 JWT Authentication

Cloud & AI

🔥 Firebase

Authentication

Firestore (Database)

Storage (Image Uploads)

🤖 Google Gemini

Multimodal AI (Text + Image)

📂 Project Structure


Campus-Issue-Resolver/
│
├── frontend/                # React application
│
├── server/
│   ├── app/
│   │   ├── routes/          # API routes
│   │   ├── models/          # Data models
│   │   ├── core/            # Firebase & security configuration
│   │   └── services/        # Gemini AI logic
│   └── main.py
│
├── README.md
└── .env


🔑 How It Works

Student logs in using Firebase Authentication

Student submits a complaint with text and/or image

Image is stored in Firebase Storage

Text + image are sent to Gemini AI

AI:

Understands the issue

Classifies it

Generates structured complaint data

Complaint is stored in Firestore

Admin reviews and resolves the issue

🆚 How Is This Different From Existing Systems?
Traditional Systems	Campus Issue Resolver
Text-only forms	Multimodal (Text + Image)
Manual sorting	AI-driven classification
Vague descriptions	Structured complaint data
Slow response	Faster resolution
🎯 Use Cases

Broken infrastructure (benches, doors, lights)

Sanitation and cleanliness issues

Hostel and classroom problems

Safety and security concerns

🔮 Future Enhancements

📱 Mobile application integration

🔔 Real-time notifications

📈 Analytics dashboard for admins

🧠 Priority prediction using AI

🌐 Multi-campus support

👩‍💻 Team & Contribution

Built as a college project / hackathon solution to solve real-world campus problems using AI and cloud technologies.

Contributions, suggestions, and improvements are welcome! 🙌
