# Hupyy Technology

## Hupyy KB - Workplace AI Platform

### Purpose
Enterprise search and workflow automation

### Problem
Work data is scattered across multiple applications (Google Workspace, Microsoft 365, Slack, Jira, Confluence, etc.)

### Solution
- Natural language search across all connected workplace apps
- Knowledge graphs with proper citations and sources
- No-code interface for creating custom apps and AI agents

### Connectors (40+)
- Google: Drive, Gmail, Calendar, Docs, Sheets, Slides, Forms, Meet
- Microsoft: OneDrive, SharePoint, Outlook, Teams, OneNote
- Project Management: Jira, Confluence, Linear, Notion
- Communication: Slack
- Development: GitHub, GitLab
- Support: Zendesk
- Storage: Dropbox, Box, S3, Azure Blob
- Data: Airtable, Bookstack

### File Formats Supported
- PDF (including scanned PDFs)
- Docx/Doc
- XLSX/XLS
- PPTX/PPT
- CSV
- Markdown
- HTML
- Text
- Google docs, slides, sheets
- Images
- Audio
- Video

### Tech Stack

**Frontend:**
- React
- TypeScript
- Material UI
- Zod
- React Hook Form

**Backend:**
- FastAPI
- LangChain
- LangGraph
- Qdrant (vector search)
- ArangoDB (multi-model graph/document database)
- Kafka (distributed event streaming)
- Redis (caching and messaging)
- Celery (distributed task queue)
- Docling (document parsing)
- PyMuPDF (PDF processing)
- OCRmyPDF (OCR for PDFs)
- pandas (data analysis)
- etcd3 (distributed key-value store)

### Deployment
- On-premise
- Cloud
- Docker Compose

---

## Formal Verification Technology

### Capability
Extract SMT-LIB/cvc5 logic from virtually any text and run through solvers

### Applications

**1. Verified RAG**
- Uses formal verification for RAG pieces ranking
- Proves query results mathematically
- Provides mathematical certainty instead of statistical probability

**2. Programming Language Verification**

**C++ Formal Verifier** (in development, ~50% complete)
- Transpiles C++ to C
- Uses Frama-C for formal verification of generated C code

**Other Languages**
- Any language that has formal verification already
- Integration with Stanford Centaur lab technologies

**3. Partnership**
- Stanford Centaur lab for formal verification technologies

---

## Autonomous Software Engineering Platform

### Status
In development

### Capability
Works completely autonomously on all stages of software engineering processes

### Key Feature
No human reviews/participation required (possible, but not required)

### Verification Coverage

**Requirements Stage**
- Verify requirements are correct
- Verify requirements are non-contradicting
- Verify requirements are feasible

**PRD Stage**
- Verify PRD is based on requirements

**Architecture Stage**
- Verify architecture design is based on PRD and requirements

**Code Stage**
- Verify code/tests are based on requirements and architecture
- Verify memory aspects
- Verify threading aspects
- Verify resources aspects
- Verify security aspects

**Language Support**
- Currently: C++
- Any language that has formal verification already
- Includes results from Stanford Centaur lab

### Integration
Integrates with existing tools

---

## Target Market

All industries and use cases

---

## C++ to C Converter Project

### Purpose
Convert modern C++ code to formally-verifiable C code

### Status
Research complete (v1.5.1, 97% confidence)
Implementation in progress (~50% complete)

### Features Supported
- Classes (single/multiple/virtual inheritance)
- Templates (full monomorphization via self-bootstrapping)
- STL containers (vector, map, set, etc.)
- RAII
- Exceptions (PNaCl SJLJ pattern)
- RTTI (type_info, dynamic_cast)
- Lambdas and closures
- C++20 coroutines
- Smart pointers

### Architecture
Two-Phase Translation:
1. C++ Source → Clang Parser → C++ AST (read-only)
2. Translation Layer → Pure C AST (generated)
3. Clang Printer → Clean C code
4. Runtime Library + Frama-C Verification

### Timeline
6 months to production-ready tool
