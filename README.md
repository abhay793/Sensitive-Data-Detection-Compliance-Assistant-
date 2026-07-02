# Sensitive Data Detection & Compliance Assistant

## Overview

Sensitive Data Detection & Compliance Assistant is an AI-powered document analysis application developed to identify sensitive information, assess security risks, generate compliance summaries, and provide intelligent question answering over uploaded documents.

The application enables users to upload business documents, automatically detect confidential information using pattern matching techniques, classify the overall security risk, generate AI-based compliance observations, and interact with the document through a Retrieval-Augmented Generation (RAG) powered chat assistant.

This project was developed as part of the AI Innovation Internship assignment for Proteccio Data.

---

## Features

### Document Upload

The application supports uploading documents in multiple formats:

- PDF
- TXT
- CSV

Uploaded documents are processed automatically for further analysis.

---

### Sensitive Data Detection

The system detects various categories of sensitive information, including:

- Aadhaar Numbers
- PAN Numbers
- Email Addresses
- Phone Numbers
- Credit Card Numbers
- Bank Account Details
- API Keys
- Passwords
- Employee IDs
- Confidential Business Information

Detection is performed using optimized Regular Expression (Regex) patterns.

---

### Risk Classification

Each uploaded document is assigned an overall security risk level based on the detected sensitive information.

Risk levels include:

- Low
- Medium
- High

The classification considers both the quantity and severity of sensitive information discovered within the document.

---

### AI-Generated Compliance Summary

The application generates a structured compliance report using Google Gemini.

The summary includes:

- Executive Summary
- Compliance Observations
- Security Risks
- Recommendations
- Overall Assessment

---

### AI Document Assistant

Users can ask questions related to the uploaded document, such as:

- What sensitive information exists in the document?
- How many email addresses were detected?
- Summarize this document.
- What compliance risks are identified?

The assistant retrieves relevant document sections using FAISS vector search before generating responses with Gemini AI.

---

### Interactive Dashboard

The frontend dashboard provides:

- Document Information
- Risk Assessment
- Sensitive Data Summary
- Detailed Detection Table
- Compliance Checklist
- AI Summary
- Interactive Chat Assistant
- Report Download

---

## System Architecture

```
                    User

                      │

                      ▼

             React Frontend

                      │

                 REST API

                      │

                      ▼

              FastAPI Backend

                      │

                      ▼

          Document Upload & Parsing

                      │

                      ▼

      Sensitive Data Detection Engine

                      │

                      ▼

          Risk Classification Engine

                      │

                      ▼

          AI Compliance Summary

                      │

                      ▼

     Sentence Transformer Embeddings

                      │

                      ▼

              FAISS Vector Store

                      │

                      ▼

          Retrieval-Augmented Chat

                      │

                      ▼

             Report Generation
```

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

### Artificial Intelligence

- Google Gemini API
- Sentence Transformers
- FAISS
- Regular Expressions (Regex)

### Supporting Libraries

- pdfplumber
- PyPDF2
- pandas
- NumPy
- python-docx

---

## Project Structure

```
Sensitive-Data-Detection-Compliance-Assistant/

│

├── backend/
│   ├── app/
│   ├── uploads/
│   ├── reports/
│   ├── vector_db/
│   ├── requirements.txt
│   └── .env.example

│

├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts

│

├── screenshots/

├── README.md

└── .gitignore

```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/<your-username>/Sensitive-Data-Detection-Compliance-Assistant.git

cd Sensitive-Data-Detection-Compliance-Assistant
```

### Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

macOS/Linux

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run the backend server.

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```
http://localhost:8000
```

Swagger documentation:

```
http://localhost:8000/docs
```

---

### Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```
---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload and analyze a document |
| POST | `/api/chat` | Ask questions about the uploaded document |
| GET | `/api/report/{analysis_id}` | Download the generated analysis report |
| GET | `/api/health` | Check API health status |

---

## AI / ML Approach

The application combines deterministic pattern matching with modern Large Language Models to analyze documents and provide intelligent responses.

### 1. Document Processing

Uploaded documents are parsed using appropriate document loaders depending on the file format.

Supported formats include:

- PDF
- TXT
- CSV

The extracted text is normalized before further processing.

---

### 2. Sensitive Data Detection

Sensitive information is detected using carefully designed Regular Expression (Regex) patterns.

The detector identifies:

- Aadhaar Numbers
- PAN Numbers
- Email Addresses
- Phone Numbers
- Credit Card Numbers
- Bank Account Details
- API Keys
- Passwords
- Employee IDs
- Confidential Business Information

Each detection is categorized and prepared for risk analysis.

---

### 3. Risk Classification

The detected information is evaluated using a rule-based scoring system.

The overall document is classified into one of the following categories:

- Low Risk
- Medium Risk
- High Risk

The classification considers:

- Number of findings
- Severity of detected information
- Presence of highly confidential data

---

### 4. AI Compliance Summary

Google Gemini is used to generate a structured compliance report.

The model produces:

- Executive Summary
- Compliance Observations
- Security Risks
- Recommendations
- Overall Assessment

The AI is prompted using the extracted document content together with the detection results and calculated risk level.

---

### 5. Retrieval-Augmented Generation (RAG)

The application implements Retrieval-Augmented Generation to improve question answering accuracy.

The workflow consists of:

1. Splitting the document into smaller text chunks.
2. Creating vector embeddings using Sentence Transformers.
3. Storing embeddings in FAISS.
4. Retrieving the most relevant document chunks based on the user's question.
5. Passing only the retrieved context to Gemini to generate the final answer.

This approach reduces hallucinations and ensures that responses remain grounded in the uploaded document.

---

## Application Workflow

The overall workflow of the application is as follows:

1. User uploads a document.
2. Document text is extracted.
3. Sensitive information is detected.
4. Overall risk is calculated.
5. AI generates compliance observations.
6. Document embeddings are created.
7. Embeddings are stored in FAISS.
8. User interacts with the AI assistant.
9. Relevant document chunks are retrieved.
10. Gemini generates document-aware responses.
11. Reports can be downloaded.

---

## Challenges Faced

Several technical challenges were encountered during development:

- Extracting text reliably from multiple document formats.
- Designing accurate Regular Expression patterns for different categories of sensitive information.
- Ensuring consistent JSON responses from the Gemini API.
- Building an efficient Retrieval-Augmented Generation pipeline.
- Synchronizing frontend and backend data models.
- Managing vector storage and retrieval using FAISS.
- Handling large document uploads while maintaining application performance.

Each challenge was addressed through iterative testing, prompt refinement, and modular application design.

---

## Future Improvements

The current implementation provides a functional prototype and can be extended further.

Potential future enhancements include:

- OCR support for scanned PDFs and images
- Automatic data masking and redaction
- Multi-document search
- Additional compliance frameworks (GDPR, HIPAA, PCI-DSS, DPDP)
- User authentication and role-based access
- Audit logging
- PDF report generation
- Docker containerization
- Cloud deployment
- Batch document analysis
- Real-time monitoring dashboard

---

## Deployment

The application can be deployed using the following platforms:

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway
- AWS
- Azure

Deployment links can be added below after hosting.

**Frontend**

```
https://your-frontend-url
```

**Backend**

```
https://your-backend-url
```

---

## Screenshots

Screenshots demonstrating the application should be placed inside the `screenshots` directory.

Suggested screenshots:

- Upload Page
- Dashboard
- Risk Assessment
- Sensitive Data Summary
- Detection Table
- AI Summary
- Chat Assistant
- Report Download

---

## Demo Video

A demonstration video (2–5 minutes) should include:

1. Project overview
2. Uploading a document
3. Sensitive data detection
4. Risk classification
5. AI-generated summary
6. Question answering
7. Report generation

---

## Security Considerations

The application follows several security practices:

- File type validation
- File size validation
- Sensitive information masking
- Context-based AI responses using RAG
- Modular backend architecture
- Environment variable management for API keys

Further production-level enhancements such as authentication, encryption, and secure storage can be incorporated in future versions.

---

## License

This project was developed for educational purposes as part of the AI Innovation Internship assignment conducted by Proteccio Data.

---

## Author

**Abhay**

AI Innovation Internship Assignment

Proteccio Data
