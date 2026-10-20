export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  category: 'Agentic AI' | 'NLP / ML' | 'GenAI & RAG' | 'AI DevTools' | 'Healthcare & Systems';
  githubUrl: string;
  liveDemoUrl?: string;
  badge: string;
  accentColor: string; // Pastel accent
  interactiveType: 'finance-agent' | 'email-classifier' | 'rag-eval' | 'code-review' | 'helpdesk' | 'sahaay';
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  accent: string;
  skills: {
    name: string;
    level: string;
    tag: string;
    highlight?: boolean;
  }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  highlights: string[];
  type: 'education' | 'project' | 'conference' | 'certification';
  badge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  badgeColor: string;
  description: string;
  image: string;
  verifyUrl?: string;
  highlights: string[];
  tags: string[];
  isLatest?: boolean;
  hours?: string;
}

export const PERSONAL_INFO = {
  name: "Ankita Behera",
  role: "AI Engineer & ML Systems Developer",
  location: "Brahmapur, Odisha, India",
  email: "ankitabehera888777@gmail.com",
  phone: "+91 8144599088",
  linkedin: "https://www.linkedin.com/in/ankita-behera-327446400",
  github: "https://github.com/ankitabehera888",
  university: "NIST University, Berhampur",
  cgpa: "8.93 / 10.0",
  graduationYear: "2024 – 2028",
  quote: "Ideas are infinite. Execution is the real algorithm.",
  tagline: "Ideas are infinite. Execution is the real algorithm.",
  heroSummary: "CS undergraduate building applied AI/ML, NLP pipelines, and autonomous agent systems shipped as working prototypes, not just coursework. AWS ML Foundations and Oracle Agentic AI certified.",
  currentlyBuilding: {
    title: "Multi-Agent Financial & NLP Intent Reasoning Pipelines",
    status: "ACTIVE",
    modelStack: "Groq LLaMA 3.3 + Agno Orchestration + Linear SVM Fast-Path",
    latency: "340ms average response",
    accuracy: "90.15% classification benchmark",
    phase: "Phase 3: Autonomous Tool Routing & Realtime Verification"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "finance-agentic-ai",
    number: "01",
    title: "AI Financial Agent",
    tagline: "Multi-agent financial assistant with live market telemetry and real-time search synthesis.",
    description: "An autonomous multi-agent financial intelligence system orchestrating specialized AI agents. A Team Leader agent delegates user queries to a Web Search Agent (DuckDuckGo tools) for current news and source citations, and a Finance Agent (YFinance tools) for live stock prices, fundamentals, and analyst ratings, combining them into structured executive reports.",
    details: [
      "Orchestrates specialized agent teams via Agno framework powered by Groq's LLaMA 3.3 70B Versatile model.",
      "Integrated YFinance Tools for live prices, fundamentals, historical metrics, and markdown tables.",
      "Integrated DuckDuckGo Search Tools for real-time market sentiment and source-attributed news citations.",
      "Team Leader agent autonomously routes between quantitative metric lookups and qualitative sentiment analysis."
    ],
    metrics: [
      { label: "Orchestration", value: "Agno Team" },
      { label: "LLM Engine", value: "LLaMA 3.3 70B" },
      { label: "Latency", value: "<450ms" }
    ],
    tags: ["Python", "Agno", "Groq", "LLaMA 3.3 70B", "YFinance", "DuckDuckGo", "Multi-Agent"],
    category: "Agentic AI",
    githubUrl: "https://github.com/ankitabehera888/FINANCE_AGENTIC_AI_PROJECT",
    badge: "Multi-Agent System",
    accentColor: "bg-amber-50 text-amber-900 border-amber-200",
    interactiveType: "finance-agent"
  },
  {
    id: "email-ml-project",
    number: "02",
    title: "Smart Email Reply System",
    tagline: "Production NLP classification pipeline and context-aware generative email reply engine.",
    description: "An end-to-end intelligent email processing system that categorizes incoming emails into 4 intent categories with 95–96% accuracy using TF-IDF feature extraction with tuned Logistic Regression, then automatically generates contextual, professional replies and suggestions using a fine-tuned Transformer model.",
    details: [
      "Engineered TF-IDF feature extraction with unigrams & bigrams across up to 15,000 vocabulary features.",
      "Trained high-accuracy classifier predicting intent (Meeting Scheduling, HR Requests, Project Updates, Inquiries).",
      "Built asynchronous FastAPI backend serving /categorize, /generate-reply, and automatic health checks.",
      "Shipped interactive Streamlit frontend supporting single replies and multi-suggestion mode with signature formatting."
    ],
    metrics: [
      { label: "Model Accuracy", value: "95–96%" },
      { label: "Feature Matrix", value: "15K TF-IDF" },
      { label: "Inference", value: "<25ms" }
    ],
    tags: ["Python", "FastAPI", "PyTorch", "Transformers", "Scikit-Learn", "Streamlit", "TF-IDF"],
    category: "NLP / ML",
    githubUrl: "https://github.com/ankitabehera888/-EMAIL_ML_PROJECT",
    badge: "95–96% Accuracy ML",
    accentColor: "bg-sky-50 text-sky-900 border-sky-200",
    interactiveType: "email-classifier"
  },
  {
    id: "pdf-rag-assistant",
    number: "03",
    title: "PDF RAG Assistant",
    tagline: "Grounded document Q&A engine with ChromaDB vector search and topic-specific question generation.",
    description: "A full-stack local PDF Question-Answering system. Extracts PDF text, chunks documents recursively with overlap, generates 384-dimensional vector embeddings with Hugging Face all-MiniLM-L6-v2, stores them in ChromaDB with metadata filtering, automatically suggests 5–8 document-specific questions using Gemini, and delivers strictly grounded answers with exact page citations.",
    details: [
      "Hugging Face all-MiniLM-L6-v2 local sentence transformer generates dense 384-dimensional document vectors.",
      "Persistent ChromaDB vector storage with strict document_id filtering preventing cross-document contamination.",
      "Representative document sampling powers Google Gemini structured JSON prompt for 5–8 non-generic suggested questions.",
      "Strict refusal guardrails preventing hallucinations, accompanied by 1-indexed page citations and text excerpts."
    ],
    metrics: [
      { label: "Embedding Dim", value: "384-d" },
      { label: "Vector DB", value: "ChromaDB" },
      { label: "Grounding", value: "Page-Cited" }
    ],
    tags: ["Python", "FastAPI", "ChromaDB", "Hugging Face", "all-MiniLM-L6-v2", "Google Gemini", "RAG"],
    category: "GenAI & RAG",
    githubUrl: "https://github.com/ankitabehera888/PDF_ASSISTANT_RAG_PROJECT-",
    badge: "Vector Search & RAG",
    accentColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
    interactiveType: "rag-eval"
  },
  {
    id: "ai-code-review",
    number: "04",
    title: "AI Code Review Assistant",
    tagline: "Production-grade code reviewer, OWASP security auditor, and automated refactoring engine.",
    description: "Full-stack developer platform powered by Google Gemini 3.7 Flash for deep code analysis across 11 programming languages. Performs multi-language static & dynamic semantic review, detects OWASP security vulnerabilities with CWE classification, identifies O(N²) complexity bottlenecks, and delivers side-by-side syntax-highlighted refactored code with exportable Markdown PR audit reports.",
    details: [
      "Multi-language auditing supporting Python, TypeScript, Java, C++, Go, Rust, C#, PHP, Ruby, and C.",
      "Security vulnerability scanner with CWE tagging for SQL Injection, XSS, Buffer Overflows, and Auth Bypasses.",
      "Side-by-side interactive code diff with PrismJS syntax highlighting and automated production-ready refactoring.",
      "Structured JSON schema response over secure server-side Node.js/Express API with zero client-side key exposure."
    ],
    metrics: [
      { label: "Languages", value: "11 Stacks" },
      { label: "AI Engine", value: "Gemini 3.7" },
      { label: "Audits", value: "OWASP & CWE" }
    ],
    tags: ["React 19", "TypeScript", "Node.js", "Express", "Google Gemini 3.7", "Tailwind CSS", "PrismJS"],
    category: "AI DevTools",
    githubUrl: "https://github.com/ankitabehera888/ai-code-review-assistant",
    badge: "Code & Security Audit",
    accentColor: "bg-purple-50 text-purple-900 border-purple-200",
    interactiveType: "code-review"
  },
  {
    id: "nist-helpdesk",
    number: "05",
    title: "NIST University Helpdesk",
    tagline: "AI-powered campus support platform with QR check-ins, interactive Leaflet navigation, and ticket analytics.",
    description: "Centralized student support web application built for NIST University. Replaces fragmented manual queries with an intelligent Gemini-powered virtual assistant, physical helpdesk counter check-in via camera QR scanning, Leaflet-powered interactive campus building maps, downloadable PDF reports with jsPDF, and visual Recharts analytics.",
    details: [
      "Integrated Google Gemini API for 24/7 instant automated resolution of common academic and campus queries.",
      "Built QR code generation & camera scanner pipeline for rapid identity check-in at physical helpdesk counters.",
      "Interactive campus map with Leaflet for department geolocation, office hours, and routing.",
      "Downloadable PDF ticket exports with jsPDF and real-time response time analytics powered by Recharts."
    ],
    metrics: [
      { label: "Stack", value: "React + Vite" },
      { label: "AI Helper", value: "Google Gemini" },
      { label: "Features", value: "QR + Leaflet" }
    ],
    tags: ["React 19", "TypeScript", "Express", "Google Gemini", "Leaflet", "jsPDF", "Recharts", "QR Code"],
    category: "AI DevTools",
    githubUrl: "https://github.com/ankitabehera888/nist-university-helpdesk",
    badge: "Campus AI Platform",
    accentColor: "bg-blue-50 text-blue-900 border-blue-200",
    interactiveType: "helpdesk"
  },
  {
    id: "sahaay-healthcare",
    number: "06",
    title: "Sahaay — Enterprise Healthcare Platform",
    tagline: "FHIR R4 compliant care continuity platform connecting PHCs, referral hospitals, ASHAs, and patients (SIH 2026).",
    description: "Enterprise-grade healthcare interoperability ecosystem developed for Smart India Hackathon (SIH 2026). Bridges primary health centres, regional hospitals, community health workers (ASHAs), and patients with 38 implemented capabilities: longitudinal FHIR R4 records, ABDM/ABHA integration, WebRTC teleconsultations via Daily.co, real-time Socket.IO communication, and an AI voice symptom assistant powered by Whisper.",
    details: [
      "Full clinical encounter lifecycle with time-series observation vitals (BP, SpO2, HR, Temp) and prescription dispensing.",
      "Interoperable FHIR R4 longitudinal patient bundle exports and Ayushman Bharat Digital Mission (ABDM) integration.",
      "WebRTC teleconsultation video rooms via Daily.co with automated attendance logs and Socket.IO real-time chat.",
      "AI-powered symptom checker with OpenAI Whisper voice transcription, TTS, and downloadable clinician PDF reports."
    ],
    metrics: [
      { label: "Capabilities", value: "38 / 38" },
      { label: "Standard", value: "FHIR R4" },
      { label: "Telehealth", value: "WebRTC + AI" }
    ],
    tags: ["FastAPI", "React", "TypeScript", "FHIR R4", "ABDM", "Socket.IO", "Daily.co", "Whisper AI", "SIH 2026"],
    category: "Healthcare & Systems",
    githubUrl: "https://github.com/ankitabehera888/SIH-PROJECT-2026",
    badge: "SIH 2026 / FHIR R4",
    accentColor: "bg-rose-50 text-rose-900 border-rose-200",
    interactiveType: "sahaay"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    subtitle: "Core mathematical models, statistical learning & neural architectures",
    accent: "border-sky-300 bg-sky-50/50",
    skills: [
      { name: "Machine Learning", level: "Advanced", tag: "Core", highlight: true },
      { name: "Deep Learning", level: "Proficient", tag: "Neural Nets" },
      { name: "NLP", level: "Specialist", tag: "Text & Syntax", highlight: true },
      { name: "Linear SVM", level: "Benchmark", tag: "Classification" },
      { name: "TF-IDF Vectorization", level: "Applied", tag: "Feature Eng." },
      { name: "Scikit-learn", level: "Expert", tag: "Modeling", highlight: true },
      { name: "NumPy & Pandas", level: "Fluent", tag: "Data Analysis" }
    ]
  },
  {
    title: "GenAI & Autonomous Agents",
    subtitle: "Large Language Models, agent orchestration & tool-calling protocols",
    accent: "border-amber-300 bg-amber-50/50",
    skills: [
      { name: "Agentic AI", level: "Certified", tag: "Oracle Certified", highlight: true },
      { name: "Agno Orchestration", level: "Applied", tag: "Multi-Agent", highlight: true },
      { name: "Groq LLM Acceleration", level: "Proficient", tag: "High-Speed Inference" },
      { name: "RAG Architecture", level: "Applied", tag: "Knowledge Retrieval" },
      { name: "Prompt Engineering", level: "Advanced", tag: "Guardrails & CoT" },
      { name: "Vector Databases", level: "Proficient", tag: "Semantic Search" },
      { name: "Tool Calling & Function APIs", level: "Hands-on", tag: "Live Retrieval" }
    ]
  },
  {
    title: "Backend & Systems",
    subtitle: "API development, asynchronous microservices & data stores",
    accent: "border-emerald-300 bg-emerald-50/50",
    skills: [
      { name: "FastAPI", level: "Proficient", tag: "Async APIs", highlight: true },
      { name: "Streamlit", level: "Expert", tag: "Rapid AI Interfaces", highlight: true },
      { name: "Python", level: "Primary", tag: "3.11+", highlight: true },
      { name: "Java & C", level: "Academic", tag: "Algorithms & OS" },
      { name: "SQL", level: "Working", tag: "Relational Queries" },
      { name: "RESTful Architecture", level: "Applied", tag: "API Design" }
    ]
  },
  {
    title: "Cloud, Tooling & Workflow",
    subtitle: "Cloud infrastructure, model training workflows & version control",
    accent: "border-purple-300 bg-purple-50/50",
    skills: [
      { name: "AWS SageMaker", level: "Certified", tag: "AWS Academy", highlight: true },
      { name: "Git & GitHub", level: "Fluent", tag: "CI/CD & Versioning" },
      { name: "Jupyter Notebooks", level: "Fluent", tag: "Exploratory ML" },
      { name: "VS Code", level: "Primary", tag: "Development" },
      { name: "YFinance & Search APIs", level: "Integration", tag: "Live Feeds" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "oracle-agentic-ai",
    title: "Oracle Certified Foundations Associate — Agentic AI",
    issuer: "Oracle Corporation",
    date: "August 10, 2026",
    credentialId: "103513803AAI26OFA",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/60",
    description: "Mastering autonomous systems through reasoning, goal-driven tool orchestration, and enterprise AI guardrails.",
    image: "/certificates/cert-oracle-agentic-ai.png",
    highlights: [
      "Engineered reasoning-based autonomous agent architectures and tool execution loops.",
      "Implemented multi-step task decomposition and prompt guardrails for robust model control.",
      "Formally recognized and accredited by Oracle Corporation as Certified Foundations Associate."
    ],
    tags: ["Agentic AI", "Autonomous Agents", "Oracle Cloud", "Tool Calling"],
    isLatest: true
  },
  {
    id: "aws-ml-foundations",
    title: "AWS Academy Graduate — Machine Learning Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "June 22, 2026",
    hours: "20 hours",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-700/60",
    description: "Foundational machine learning pipeline development, data preprocessing, and model evaluation on AWS infrastructure.",
    image: "/certificates/cert-aws-ml-foundations.png",
    verifyUrl: "https://www.credly.com/go/Yj53mzTY",
    highlights: [
      "Completed 20 hours of structured curriculum covering regression, classification, and clustering.",
      "Engineered feature preprocessing, hyperparameter optimization, and validation pipelines.",
      "Verified digital badge earned and published through Credly."
    ],
    tags: ["AWS Academy", "Machine Learning", "Model Evaluation", "Cloud ML"]
  },
  {
    id: "aws-ml-nlp",
    title: "AWS Academy Graduate — Machine Learning for Natural Language Processing",
    issuer: "Amazon Web Services (AWS)",
    date: "July 12, 2026",
    hours: "20 hours",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/60",
    description: "End-to-end natural language processing workflows, text embeddings, sequence modeling, and transformer applications.",
    image: "/certificates/cert-aws-nlp.png",
    verifyUrl: "https://www.credly.com/go/DMApkBlI",
    highlights: [
      "20 hours of focused NLP training on text classification, sentiment analysis, and tokenization.",
      "Explored transformer mechanics, attention layers, and linguistic feature vectorization.",
      "Official AWS Academy Graduate digital credential verifiable on Credly."
    ],
    tags: ["AWS Academy", "NLP", "Text Processing", "Language Models"]
  },
  {
    id: "infosys-prompt-eng",
    title: "Prompt Engineering — Course Completion",
    issuer: "Infosys Springboard",
    date: "April 22, 2026",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/60",
    description: "Systematic prompt design patterns, few-shot prompting, defensive guardrails, and output structuring for LLMs.",
    image: "/certificates/cert-infosys-prompt-eng.png",
    verifyUrl: "https://verify.onwingspan.com",
    highlights: [
      "Mastered structured prompt patterns, role prompting, and chain-of-thought methodologies.",
      "Implemented defensive guardrails to minimize hallucinations and enforce deterministic outputs.",
      "Verified course completion certificate issued by Infosys Springboard."
    ],
    tags: ["Prompt Engineering", "LLM Steering", "Guardrails", "Generative AI"]
  }
];

export interface SummerCourse {
  id: string;
  title: string;
  issuer: string;
  period: string;
  completionDate: string;
  credentialId?: string;
  instructor?: string;
  rollNo?: string;
  badge: string;
  badgeColor: string;
  description: string;
  image: string;
  highlights: string[];
  skills: string[];
}

export const SUMMER_COURSES_DATA: SummerCourse[] = [
  {
    id: "nist-cpp-summer",
    title: "Object Oriented Programming Using C++",
    issuer: "NIST University",
    period: "16th June – 7th July 2025",
    completionDate: "31 July 2025",
    credentialId: "NISTU/SD/SC/2025/0680",
    rollNo: "202457130",
    instructor: "Dr. Basant Kumar Sahu (Coordinator) • Prof. Priyadarsan Patra (Vice Chancellor)",
    badge: "University Summer Course",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/60",
    description: "Intensive 3-week university summer course at NIST University covering core Object-Oriented Programming principles, memory management, classes & objects, inheritance, polymorphism, and modular problem-solving in C++.",
    image: "/certificates/cert-nist-cpp-summer.png",
    highlights: [
      "Completed 3-week academic summer course (16 June – 7 July 2025) held at NIST University.",
      "Covered OOP paradigms, pointers, dynamic memory allocation, operator overloading, and class hierarchies.",
      "Awarded Certificate of Completion (Roll No. 202457130, Cert No. NISTU/SD/SC/2025/0680)."
    ],
    skills: ["C++", "OOP Principles", "Memory Management", "Class Hierarchies", "Problem Solving"]
  },
  {
    id: "cisco-cpp-essentials-1",
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy",
    period: "June 2025",
    completionDate: "21 June 2025",
    instructor: "Ashish Kumar Dass",
    badge: "Cisco Networking Academy",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-700/60",
    description: "Official Cisco Networking Academy program offered through National Institute of Science & Technology, certifying foundational C++ programming syntax, control logic, data types, and function structures.",
    image: "/certificates/cert-cisco-cpp-essentials-1.png",
    highlights: [
      "Mastered fundamental computer programming concepts, compilation workflows, and data structures.",
      "Implemented conditional logic, loops, bitwise operations, and memory pointers.",
      "Certified under instructor Ashish Kumar Dass through the Cisco Networking Academy program."
    ],
    skills: ["C++ Syntax", "Control Flow", "Functions", "Pointers", "Data Types"]
  },
  {
    id: "cisco-cpp-essentials-2",
    title: "C++ Essentials 2",
    issuer: "Cisco Networking Academy & C++ Institute",
    period: "July 2025",
    completionDate: "08 July 2025",
    instructor: "Ashish Kumar Dass",
    badge: "Cisco & C++ Institute",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/60",
    description: "Advanced certification awarded by Cisco Networking Academy and C++ Institute (Open Education & Development Group), validating modern object-oriented C++ mechanisms, operator overloading, templates, and exception handling.",
    image: "/certificates/cert-cisco-cpp-essentials-2.png",
    highlights: [
      "Deep dive into object-oriented mechanics, abstract classes, virtual methods, and inheritance.",
      "Engineered solutions using operator overloading, template functions, and exception handling.",
      "Joint accreditation by Cisco Networking Academy and Open Education & Development Group (C++ Institute)."
    ],
    skills: ["Advanced OOP", "Operator Overloading", "Templates", "Exception Handling", "STL Basics"]
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2026",
    title: "Agentic AI & Multi-Agent Architecture",
    role: "AI Developer & Researcher",
    organization: "NIST University & Autonomous Projects",
    description: "Engineered Finance Agentic AI with Groq & Agno. Built 50K-sample email intent classifier pipeline with 90.15% accuracy. Earned Oracle Agentic AI & AWS ML NLP certifications.",
    highlights: [
      "Attended India AI Impact Summit 2026 at IIT Bhubaneswar (LLM Architecture & Responsible AI).",
      "Participated in ICADS-26 International Conference organized with Army Air Defence College, IEEE, & DRDO.",
      "Achieved Oracle Agentic AI certification."
    ],
    type: "project",
    badge: "Current Milestone"
  },
  {
    year: "2025",
    title: "Machine Learning Pipelines & Cloud Engineering",
    role: "ML Practitioner",
    organization: "NIST University & AWS Academy",
    description: "Deepened practical machine learning expertise across supervised learning, text vectorization, and SageMaker model development. Completed 40+ hours of AWS Academy ML programs.",
    highlights: [
      "AWS ML Foundations & AWS NLP Certifications earned.",
      "Shipped linear classification benchmarks & Streamlit interfaces.",
      "Sustained 8.93 cumulative CGPA across rigorous computer science coursework."
    ],
    type: "certification"
  },
  {
    year: "Summer 2025",
    title: "Object-Oriented Programming & Systems in C++",
    role: "Summer Course Scholar",
    organization: "NIST University & Cisco Networking Academy",
    description: "Completed intensive academic summer training in Object Oriented Programming Using C++ at NIST University along with dual Cisco Networking Academy & C++ Institute credentials (C++ Essentials 1 & 2). Built deep proficiency in OOP paradigms, modular architecture, and low-level memory concepts.",
    highlights: [
      "NIST University Summer Course Certificate in OOP using C++ (16 June – 7 July 2025, Cert: NISTU/SD/SC/2025/0680).",
      "Completed Cisco Networking Academy C++ Essentials 1 certification (21 June 2025).",
      "Completed Cisco Networking Academy & C++ Institute C++ Essentials 2 certification (08 July 2025).",
      "Mastered OOP principles, class hierarchies, operator overloading, templates, and pointers."
    ],
    type: "education",
    badge: "Summer 2025 Course"
  },
  {
    year: "2024",
    title: "Computer Science Engineering Journey Began",
    role: "B.Tech CSE Undergraduate",
    organization: "NIST University, Berhampur",
    description: "Admitted into B.Tech CSE (2024–2028). Mastered core algorithms, C/Java programming, data structures, and relational database systems.",
    highlights: [
      "Strong academic foundation with 8.93 CGPA through 4th semester.",
      "Built algorithmic simulators and foundational computer systems logic."
    ],
    type: "education"
  }
];

export const STATS_ITEMS = [
  { label: "Academic CGPA", value: "8.93", suffix: "/10", meta: "NIST University (Through 4th Sem)" },
  { label: "Classifier Accuracy", value: "90.15", suffix: "%", meta: "On 50,000 Sample Test Set" },
  { label: "Technical Certifications", value: "04", suffix: "+", meta: "Oracle & AWS Machine Learning" },
  { label: "Curiosity & Drive", value: "∞", suffix: "", meta: "Always Learning & Shipping" }
];
