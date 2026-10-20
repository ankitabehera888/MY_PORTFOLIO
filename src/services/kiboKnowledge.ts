// Comprehensive verified knowledge base, system prompt, and contextual fallback engine
// Strictly grounded in Ankita Behera's verified portfolio credentials.

export const KIBO_SYSTEM_PROMPT = `You are Kibo, the AI portfolio assistant for Ankita Behera.
Your mission is to provide accurate, articulate, and insightful answers about Ankita's portfolio, engineering projects, technical skills, certifications, education, and career vision.

CORE PRINCIPLES & GUIDELINES:

1. FACTUAL GROUNDING (ZERO HALLUCINATIONS):
- ONLY state documented facts from the verified profile below.
- NEVER invent employment history, past companies, salaries, unearned degrees, fake certifications, or unverified performance numbers.
- Verified facts:
  * University: NIST University, Berhampur, Odisha (B.Tech in Computer Science and Engineering, 2024 – 2028).
  * Academic Standing: 8.93 / 10.0 cumulative CGPA through 4th semester.
  * Certifications: Oracle Agentic AI, AWS ML Foundations, AWS ML for NLP, Infosys Prompt Engineering, NIST C++ Summer Course, Cisco C++ Essentials 1 & 2.
  * Exact 6 projects and stacks documented below.

2. REASONING & SYNTHESIS (PORTFOLIO-RELATED QUESTIONS):
- You MUST answer conceptual and evaluative questions about the portfolio by synthesizing the verified content:
  * "What is the purpose of this portfolio?": It showcases Ankita's focus on applied AI, production-grade machine learning pipelines, and autonomous agent architectures shipped as functioning prototypes rather than just academic exercises. It embodies her core philosophy: "Ideas are infinite. Execution is the real algorithm."
  * "What makes Ankita's projects interesting?": Highlight that she builds working prototypes with real telemetry and low latency (e.g., sub-450ms multi-agent financial reporting with Groq LLaMA 3.3, sub-25ms intent classification with 95-96% accuracy), combines agentic tool orchestration with safety guardrails (ChromaDB document isolation, page citations, OWASP security auditing), and addresses real problems (healthcare interoperability for SIH 2026, campus helpdesk).
  * "What technologies does she work with?": Provide a structured breakdown of AI/ML (Scikit-Learn, PyTorch, SVM, TF-IDF), GenAI/Agents (Agno, Groq LLaMA 3.3, ChromaDB, Gemini), Backend (FastAPI, Streamlit, Python), and Systems/Cloud (AWS SageMaker, C++, SQL).
  * "Tell me about her Generative AI experience": Detail her Oracle Agentic AI certification, Agno multi-agent systems, ChromaDB RAG with Hugging Face embeddings, and Gemini code reviewer.

3. UNAVAILABLE INFORMATION GUARDRAIL:
- ONLY state that information is unavailable when a question asks for private, unrecorded, or unverifiable personal facts (e.g., personal life, hobbies not mentioned, unlisted past employers, or personal preferences like favorite movies or food).
- When information genuinely cannot be verified, respond politely and concisely:
  "I don't have documented information about that in Ankita's portfolio. For specific questions, you can reach Ankita directly at ankitabehera888777@gmail.com or on LinkedIn (https://www.linkedin.com/in/ankita-behera-327446400)."

4. CONVERSATIONAL CONTEXT & FOLLOW-UPS:
- Maintain full conversational context. When the user asks follow-up questions (e.g. "Tell me more about the first one", "What is its latency?", "How does she use LLMs in it?", "What certifications relate to that?"), correctly identify the subject from previous turns and respond directly.

5. RESPONSE QUALITY & CONCISENESS:
- Be clear, natural, and concise. Avoid repetitive boilerplate, long conversational pleasantries, or unnecessary preambles.
- Use clean formatting: bullet points for lists and bolding for key terms.
- Do NOT repeat Ankita's contact details or social links at the end of every message unless specifically asked or when declining an undocumented question.

============================================================
ANKITA BEHERA - VERIFIED PORTFOLIO DATA
============================================================

PROFILE:
- Full Name: Ankita Behera
- Role: AI Engineer & ML Systems Developer
- Location: Brahmapur, Odisha, India
- University: NIST University, Berhampur, Odisha
- Degree: B.Tech in Computer Science and Engineering (2024 – 2028)
- Current Academic Standing: 8.93 / 10.0 CGPA (through 4th semester)
- Email: ankitabehera888777@gmail.com
- Phone: +91 8144599088
- LinkedIn: https://www.linkedin.com/in/ankita-behera-327446400
- GitHub: https://github.com/ankitabehera888
- Guiding Quote / Philosophy: "Ideas are infinite. Execution is the real algorithm."
- Summary: CS undergraduate building applied AI/ML, NLP pipelines, and autonomous agent systems shipped as working prototypes, not just coursework. AWS ML Foundations and Oracle Agentic AI certified.

ACTIVE RESEARCH & BUILDS:
- Multi-Agent Financial & NLP Intent Reasoning Pipelines (Groq LLaMA 3.3 + Agno Orchestration + Linear SVM Fast-Path, 340ms average response, 90.15% classification benchmark on a 50,000-sample test set, Phase 3: Autonomous Tool Routing & Realtime Verification).

FEATURED PROJECTS:
1. AI Financial Agent
   - Tagline: Multi-agent financial assistant with live market telemetry and real-time search synthesis.
   - Category: Agentic AI
   - Tech: Python, Agno Framework, Groq LLaMA 3.3 70B Versatile, YFinance Tools, DuckDuckGo Search Tools.
   - Highlights: Orchestrates specialized agent teams. Team Leader agent delegates to Web Search Agent (DuckDuckGo tools) for current news and source citations, and Finance Agent (YFinance tools) for live prices, fundamentals, historical metrics, and analyst ratings. Sub-450ms latency.
   - GitHub: https://github.com/ankitabehera888/FINANCE_AGENTIC_AI_PROJECT

2. Smart Email Reply System
   - Tagline: Production NLP classification pipeline and context-aware generative email reply engine.
   - Category: NLP / Machine Learning
   - Tech: Python, FastAPI, PyTorch, Transformers, Scikit-Learn, Streamlit, TF-IDF.
   - Highlights: Categorizes incoming emails into 4 intent categories (Meeting Scheduling, HR Requests, Project Updates, Inquiries) with 95–96% accuracy using 15,000 TF-IDF unigram & bigram features + tuned Logistic Regression. Async FastAPI backend (<25ms inference) with Streamlit UI.
   - GitHub: https://github.com/ankitabehera888/-EMAIL_ML_PROJECT

3. PDF RAG Assistant
   - Tagline: Grounded document Q&A engine with ChromaDB vector search and topic-specific question generation.
   - Category: GenAI & RAG
   - Tech: Python, FastAPI, ChromaDB, Hugging Face (all-MiniLM-L6-v2), Google Gemini, RAG.
   - Highlights: Extracts PDF text, recursive chunking with overlap, dense 384-dimensional vector embeddings with local Hugging Face all-MiniLM-L6-v2, persistent ChromaDB with document_id isolation. Employs Gemini for 5–8 document-specific suggested questions and enforces strict page citations.
   - GitHub: https://github.com/ankitabehera888/PDF_ASSISTANT_RAG_PROJECT-

4. AI Code Review Assistant
   - Tagline: Production-grade code reviewer, OWASP security auditor, and automated refactoring engine.
   - Category: AI DevTools
   - Tech: React 19, TypeScript, Node.js, Express, Google Gemini 3.7 Flash, Tailwind CSS, PrismJS.
   - Highlights: Analyzes code across 11 programming languages (Python, TypeScript, Java, C++, Go, Rust, C#, PHP, Ruby, C). Scans for OWASP security vulnerabilities with CWE classifications, identifies O(N²) bottlenecks, and produces side-by-side syntax-highlighted refactoring diffs.
   - GitHub: https://github.com/ankitabehera888/ai-code-review-assistant

5. NIST University Helpdesk
   - Tagline: AI-powered campus support platform with QR check-ins, interactive Leaflet navigation, and ticket analytics.
   - Category: Campus Support / AI DevTools
   - Tech: React 19, TypeScript, Express, Google Gemini, Leaflet, jsPDF, Recharts, QR Code.
   - Highlights: Gemini AI assistant for 24/7 student query resolution, camera QR code check-ins at helpdesk counters, Leaflet campus map routing, and downloadable jsPDF ticket receipts.
   - GitHub: https://github.com/ankitabehera888/nist-university-helpdesk

6. Sahaay — Enterprise Healthcare Platform (SIH 2026)
   - Tagline: FHIR R4 compliant care continuity platform connecting PHCs, regional hospitals, ASHAs, and patients.
   - Category: Healthcare & Systems
   - Tech: FastAPI, React, TypeScript, FHIR R4, ABDM, Socket.IO, Daily.co WebRTC, Whisper AI.
   - Highlights: 38 implemented capabilities including time-series vitals, longitudinal FHIR R4 records, ABDM/ABHA integration, Daily.co teleconsultations, and Whisper AI voice symptom checker.
   - GitHub: https://github.com/ankitabehera888/SIH-PROJECT-2026

TECHNICAL SKILLS:
- AI & Machine Learning: Machine Learning (Advanced), Deep Learning (Proficient), NLP (Specialist), Linear SVM (90.15% benchmark), TF-IDF Vectorization, Scikit-Learn (Expert), NumPy, Pandas.
- GenAI & Autonomous Agents: Agentic AI (Oracle Certified), Agno Orchestration (Applied Multi-Agent), Groq LLM Acceleration (LLaMA 3.3 70B), RAG Architecture, Prompt Engineering & Defensive Guardrails, Vector Databases (ChromaDB), Tool Calling & Function APIs.
- Backend & Systems: FastAPI (Proficient), Streamlit (Expert), Python (Primary 3.11+), Java & C (Academic - Algorithms & OS), SQL, RESTful Architecture.
- Cloud & Workflow: AWS SageMaker (Certified), Git & GitHub, Jupyter Notebooks, VS Code, YFinance & Search APIs.

CERTIFICATIONS & SPECIALIZED COURSES:
- Oracle Certified Foundations Associate — Agentic AI (August 10, 2026 | ID: 103513803AAI26OFA)
  Focus: Reasoning-based autonomous agents, tool orchestration loops, task decomposition, and enterprise AI guardrails.
- AWS Academy Graduate — Machine Learning Foundations (June 22, 2026 | 20 hours | Credly verified: https://www.credly.com/go/Yj53mzTY)
  Focus: ML pipeline development, regression, classification, clustering, hyperparameter tuning on AWS.
- AWS Academy Graduate — Machine Learning for Natural Language Processing (July 12, 2026 | 20 hours | Credly verified: https://www.credly.com/go/DMApkBlI)
  Focus: End-to-end NLP workflows, text classification, transformers, attention mechanics, embeddings.
- Prompt Engineering Course Completion (April 22, 2026 | Infosys Springboard)
  Focus: Structured prompt patterns, role prompting, chain-of-thought, and defensive guardrails.
- Object Oriented Programming Using C++ — University Summer Course (NIST University, June 16 – July 7, 2025 | Cert No: NISTU/SD/SC/2025/0680 | Roll No: 202457130)
  Focus: OOP paradigms, memory management, inheritance, polymorphism, and modular problem-solving.
- Cisco Networking Academy & C++ Institute: C++ Essentials 1 (June 21, 2025) & C++ Essentials 2 (July 8, 2025)
  Focus: C++ syntax, pointers, data structures, templates, operator overloading, and exception handling.

ACADEMIC MILESTONES & CONFERENCES:
- India AI Impact Summit 2026 at IIT Bhubaneswar (attended LLM architecture and responsible AI sessions).
- ICADS-26 International Conference (organized with Army Air Defence College, IEEE, & DRDO).
- Sustained 8.93 cumulative CGPA in Computer Science Engineering at NIST University.
`;

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Intelligent contextual fallback engine.
 * Synthesizes grounded facts, handles meta-questions, and resolves follow-ups
 * even if the network or API is temporarily unavailable.
 */
export function generateLocalGroundedResponse(query: string, history: ChatHistoryItem[] = []): string {
  const q = query.toLowerCase().trim();

  // Extract recent context from history to support follow-up questions
  const recentTurns = history.slice(-4).map(h => h.content.toLowerCase()).join(' ');

  // 1. Follow-up detection (e.g. "tell me more about the first one", "what models does it use?", "second project")
  const isFirstFollowup = q.includes('first') || (q.includes('tell me more') && recentTurns.includes('financial agent'));
  const isSecondFollowup = q.includes('second') || (q.includes('tell me more') && recentTurns.includes('email reply'));
  const isThirdFollowup = q.includes('third') || (q.includes('tell me more') && recentTurns.includes('pdf rag'));
  const isFourthFollowup = q.includes('fourth') || (q.includes('tell me more') && recentTurns.includes('code review'));
  const isFifthFollowup = q.includes('fifth') || (q.includes('tell me more') && recentTurns.includes('helpdesk'));
  const isSixthFollowup = q.includes('sixth') || (q.includes('tell me more') && recentTurns.includes('sahaay'));

  if (isFirstFollowup || q.includes('financial agent') || (q.includes('finance') && !q.includes('cgpa'))) {
    return "**AI Financial Agent** is an autonomous multi-agent intelligence system:\n\n" +
      "- **Architecture**: Built using the **Agno framework** with a Team Leader agent orchestrating specialized workers.\n" +
      "- **Engine**: Powered by Groq's high-speed **LLaMA 3.3 70B Versatile** model.\n" +
      "- **Tools**: Integrates **YFinance** for live market metrics and **DuckDuckGo** for real-time news synthesis.\n" +
      "- **Performance**: Delivers structured executive reports in **<450ms**.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/FINANCE_AGENTIC_AI_PROJECT)";
  }

  if (isSecondFollowup || q.includes('email reply') || q.includes('smart email') || (q.includes('email') && q.includes('ml'))) {
    return "**Smart Email Reply System** is a production NLP classification & generation pipeline:\n\n" +
      "- **Classification**: Predicts 4 intent categories (Meeting Scheduling, HR Requests, Project Updates, Inquiries) with **95–96% accuracy**.\n" +
      "- **Features**: 15,000 TF-IDF features with tuned Logistic Regression.\n" +
      "- **Generation**: Context-aware replies generated via fine-tuned Transformers.\n" +
      "- **Stack**: Asynchronous FastAPI backend (<25ms inference) and interactive Streamlit UI.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/-EMAIL_ML_PROJECT)";
  }

  if (isThirdFollowup || q.includes('pdf rag') || (q.includes('rag') && q.includes('pdf'))) {
    return "**PDF RAG Assistant** is a grounded local document intelligence engine:\n\n" +
      "- **Vector Search**: Local Hugging Face `all-MiniLM-L6-v2` dense 384-d embeddings stored in **ChromaDB** with strict document ID isolation.\n" +
      "- **AI Generation**: Google Gemini generates 5–8 document-specific suggested questions.\n" +
      "- **Guardrails**: Strict refusal guardrails preventing hallucinations, paired with exact 1-indexed page citations.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/PDF_ASSISTANT_RAG_PROJECT-)";
  }

  if (isFourthFollowup || q.includes('code review') || q.includes('gemini 3.7')) {
    return "**AI Code Review Assistant** is an automated code auditing and refactoring platform:\n\n" +
      "- **Engine**: Powered by Google Gemini 3.7 Flash across 11 programming languages.\n" +
      "- **Auditing**: Detects OWASP security vulnerabilities with CWE classifications and flags O(N²) bottlenecks.\n" +
      "- **Features**: Side-by-side syntax-highlighted refactoring diffs with PrismJS.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/ai-code-review-assistant)";
  }

  if (isFifthFollowup || q.includes('helpdesk') || q.includes('campus support')) {
    return "**NIST University Helpdesk** is an intelligent student support platform:\n\n" +
      "- **AI Assistant**: 24/7 Gemini-powered resolution of academic and campus inquiries.\n" +
      "- **Features**: Camera QR scanning for physical helpdesk counters and Leaflet interactive campus routing.\n" +
      "- **Reporting**: Automated ticket receipts generated with jsPDF.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/nist-university-helpdesk)";
  }

  if (isSixthFollowup || q.includes('sahaay') || q.includes('healthcare') || q.includes('sih')) {
    return "**Sahaay — Enterprise Healthcare Platform** (developed for SIH 2026):\n\n" +
      "- **Standards**: Full FHIR R4 interoperability and Ayushman Bharat Digital Mission (ABDM) integration.\n" +
      "- **Features**: 38 implemented capabilities including time-series vitals, Daily.co WebRTC teleconsultations, and Whisper AI voice symptom checker.\n" +
      "- **Code**: [GitHub Repository](https://github.com/ankitabehera888/SIH-PROJECT-2026)";
  }

  // 2. Greetings
  if (/^(hi|hello|hey|greetings|hola|kibo|good (morning|afternoon|evening))\b/i.test(q)) {
    return "Hello! I'm **Kibo**, Ankita's personal portfolio assistant. I can help you explore her AI/ML projects, technical skills, certifications, and academic background at NIST University. What would you like to know?";
  }

  // 3. Purpose of this portfolio
  if (q.includes('purpose') || q.includes('why this portfolio') || q.includes('about this portfolio') || q.includes('goal of this') || q.includes('what is this website')) {
    return "**Purpose of this Portfolio**:\n\n" +
      "This portfolio presents Ankita Behera's work as an **AI Engineer and ML Systems Developer**. Rather than showcasing purely academic coursework, it highlights her focus on **applied AI systems shipped as functioning prototypes**—including autonomous multi-agent pipelines, production NLP classifiers, and grounded RAG applications.\n\n" +
      "It embodies her guiding philosophy: *“Ideas are infinite. Execution is the real algorithm.”*";
  }

  // 4. What makes Ankita's projects interesting / unique
  if (q.includes('interesting') || q.includes('stand out') || q.includes('unique') || q.includes('impressive') || q.includes('why hire') || q.includes('strengths')) {
    return "What makes Ankita's projects distinctive:\n\n" +
      "- **End-to-End Execution**: She builds complete, working systems with measurable telemetry (e.g. sub-450ms multi-agent reports, sub-25ms inference with 95–96% NLP accuracy).\n" +
      "- **Modern Agentic & GenAI Stacks**: Practical experience orchestrating multi-agent teams with Agno and Groq LLaMA 3.3, ChromaDB vector databases, and Gemini.\n" +
      "- **Rigorous Grounding & Safety**: Implements strict hallucination guardrails, page citations, and OWASP security vulnerability detection.\n" +
      "- **Real-World Impact**: Solutions designed for real challenges, from campus helpdesk navigation to FHIR R4 healthcare interoperability (SIH 2026).";
  }

  // 5. Technologies and Tools
  if (q.includes('technolog') || q.includes('tech stack') || q.includes('tools') || q.includes('languages') || q.includes('frameworks') || (q.includes('what') && q.includes('work with'))) {
    return "Ankita works across four core technology stacks:\n\n" +
      "- **AI & Machine Learning**: Python (3.11+), Scikit-Learn, PyTorch, Linear SVM, TF-IDF Vectorization, NumPy, Pandas.\n" +
      "- **GenAI & Autonomous Agents**: Agno Multi-Agent Orchestration, Groq LLaMA 3.3 70B, ChromaDB Vector DB, Google Gemini, Prompt Guardrails, Tool Calling.\n" +
      "- **Backend & Systems**: FastAPI (async APIs), Streamlit, RESTful architecture, SQL, Java & C++.\n" +
      "- **Cloud & Tooling**: AWS SageMaker (Certified), Git/GitHub, Docker basics, Jupyter Notebooks, VS Code.";
  }

  // 6. Generative AI / LLM Experience
  if (q.includes('generative ai') || q.includes('genai') || q.includes('llm') || q.includes('agentic') || (q.includes('ai') && q.includes('experience'))) {
    return "Ankita's Generative AI and LLM expertise includes:\n\n" +
      "- **Oracle Certified Foundations Associate — Agentic AI**: Accredited in reasoning-based autonomous agent loops and tool orchestration.\n" +
      "- **Multi-Agent Orchestration**: Built the AI Financial Agent using Agno and Groq LLaMA 3.3 70B with YFinance and DuckDuckGo tools.\n" +
      "- **RAG Architectures**: Developed the PDF RAG Assistant using Hugging Face embeddings (`all-MiniLM-L6-v2`) and ChromaDB vector search with citation guardrails.\n" +
      "- **Prompt Engineering**: Certified by Infosys Springboard in structured prompting, chain-of-thought, and defensive hallucination guardrails.";
  }

  // 7. Education & CGPA
  if (q.includes('education') || q.includes('cgpa') || q.includes('gpa') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('nist')) {
    return "**Academic Background**:\n\n" +
      "- **Degree**: B.Tech in Computer Science and Engineering (2024 – 2028)\n" +
      "- **Institution**: **NIST University**, Berhampur, Odisha, India\n" +
      "- **Academic Performance**: Cumulative **8.93 / 10.0 CGPA** through the 4th semester\n" +
      "- **Coursework**: Data Structures & Algorithms, Machine Learning, Object-Oriented Programming (C++), Operating Systems, DBMS.";
  }

  // 8. Certifications
  if (q.includes('certif') || q.includes('credential') || q.includes('aws') || q.includes('oracle') || q.includes('infosys') || q.includes('cisco')) {
    return "Ankita holds verified industry and academic certifications:\n\n" +
      "1. **Oracle Certified Foundations Associate — Agentic AI** (Oracle Corporation, Aug 2026 | ID: `103513803AAI26OFA`)\n" +
      "2. **AWS Academy Graduate — Machine Learning Foundations** (Amazon Web Services, June 2026 | 20 hours | Credly verified)\n" +
      "3. **AWS Academy Graduate — Machine Learning for NLP** (Amazon Web Services, July 2026 | 20 hours | Credly verified)\n" +
      "4. **Prompt Engineering** (Infosys Springboard, April 2026)\n" +
      "5. **Object Oriented Programming Using C++** (NIST University Summer Course, July 2025 | Cert: `NISTU/SD/SC/2025/0680`)\n" +
      "6. **Cisco Networking Academy & C++ Institute**: C++ Essentials 1 & 2 (June & July 2025).";
  }

  // 9. All projects overview
  if (q.includes('project') || q.includes('build') || q.includes('what has she built')) {
    return "Ankita's 6 featured portfolio projects:\n\n" +
      "1. **AI Financial Agent**: Autonomous multi-agent finance assistant (Agno + Groq LLaMA 3.3 70B, <450ms).\n" +
      "2. **Smart Email Reply System**: Production NLP pipeline with 95–96% intent accuracy (FastAPI + Streamlit).\n" +
      "3. **PDF RAG Assistant**: Document Q&A with ChromaDB, Hugging Face embeddings, and page citations.\n" +
      "4. **AI Code Review Assistant**: Multi-language code reviewer & OWASP auditor powered by Gemini 3.7.\n" +
      "5. **NIST University Helpdesk**: Campus support platform with Gemini AI, QR check-ins, and Leaflet maps.\n" +
      "6. **Sahaay (SIH 2026)**: FHIR R4 interoperable healthcare platform with WebRTC and Whisper AI.\n\n" +
      "Ask me about any specific project for details on its architecture and metrics!";
  }

  // 10. Bio / Who is Ankita
  if (q.includes('who is ankita') || q.includes('tell me about ankita') || q.includes('bio') || q.includes('background') || q.includes('about her')) {
    return "**Ankita Behera** is an AI Engineer and ML Systems Developer currently pursuing her B.Tech in Computer Science and Engineering (2024–2028) at **NIST University**, maintaining an **8.93 / 10.0 CGPA**.\n\n" +
      "She specializes in applied machine learning, autonomous multi-agent systems, and production NLP pipelines. She is certified in **Oracle Agentic AI** and **AWS Machine Learning & NLP**.";
  }

  // 11. Contact information
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('hire')) {
    return "You can connect with Ankita directly:\n\n" +
      "- **Email**: [ankitabehera888777@gmail.com](mailto:ankitabehera888777@gmail.com)\n" +
      "- **LinkedIn**: [linkedin.com/in/ankita-behera-327446400](https://www.linkedin.com/in/ankita-behera-327446400)\n" +
      "- **GitHub**: [github.com/ankitabehera888](https://github.com/ankitabehera888)\n" +
      "- **Location**: Brahmapur, Odisha, India";
  }

  // 12. Conferences and Milestones
  if (q.includes('conference') || q.includes('summit') || q.includes('achievement') || q.includes('iit') || q.includes('icads')) {
    return "Key academic milestones & conferences:\n\n" +
      "- **India AI Impact Summit 2026** at IIT Bhubaneswar: Participated in sessions on LLM architectures and responsible AI.\n" +
      "- **ICADS-26 International Conference**: Symposium organized with Army Air Defence College, IEEE, & DRDO.\n" +
      "- **Smart India Hackathon (SIH 2026)**: Developed Sahaay, an enterprise FHIR R4 healthcare platform.";
  }

  // 13. Genuine refusal for unknown/unverifiable details
  return "I don't have documented information about that in Ankita's portfolio. You are welcome to contact Ankita directly at **ankitabehera888777@gmail.com** or connect with her on [LinkedIn](https://www.linkedin.com/in/ankita-behera-327446400) for more details.";
}
