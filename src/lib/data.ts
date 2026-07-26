export const siteConfig = {
  name: "Rahul Lohra",
  title: "Rahul Lohra — AI Engineer & Product Builder",
  description:
    "Engineering AI systems from idea to production. I build intelligent products combining machine learning, scalable backends, and exceptional user experiences.",
  url: "https://rahullohra.dev",
  email: "rahullohra.work@gmail.com",
  github: "https://github.com/rahullohra",
  linkedin: "https://linkedin.com/in/rahullohra",
};

export const heroStats = [
  { label: "Production Systems", value: 10, suffix: "+" },
  { label: "ML Pipeline Accuracy", value: 85, suffix: "%" },
  { label: "Workflow Efficiency Gain", value: 40, suffix: "%" },
  { label: "Test Coverage", value: 90, suffix: "%" },
];

export const experience = [
  {
    role: "Project Trainee — Cybersecurity & Web Engineering",
    company: "CERT-In (Indian Computer Emergency Response Team)",
    companyDesc: "Ministry of Electronics & IT, Government of India",
    period: "June 2024 — July 2024",
    location: "New Delhi, India",
    highlights: [
      "Architected and deployed a full-stack Django application for CERT-In's internal operations—centralizing contact management across government departments.",
      "Engineered a high-security authentication system with PBKDF2-SHA256 hashing, role-based access control, and encrypted credential flows.",
      "Integrated Twilio SMS and Gmail SMTP APIs for automated, real-time communication pipelines reaching 100+ stakeholders.",
      "Built a comprehensive automated test suite achieving 90%+ code coverage across the platform.",
      "Reduced manual contact management workflows by 40% through intelligent form automation and data validation layers.",
    ],
    stack: ["Django", "Python", "PostgreSQL", "Twilio API", "Gmail SMTP", "PBKDF2-SHA256", "REST API"],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Banaras Hindu University (BHU)",
    period: "2023 — 2025",
    location: "Varanasi, India",
    highlights: ["One of India's premier institutions (IIT BHU campus)", "Focus: Machine Learning, Distributed Systems, Software Architecture"],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Banaras Hindu University (BHU)",
    period: "2020 — 2023",
    location: "Varanasi, India",
    highlights: ["Foundation in Computer Science, Algorithms, Data Structures", "Built multiple full-stack projects"],
  },
];

export const projects = [
  {
    id: "doc-summarizer",
    title: "AI Document Intelligence Platform",
    shortDesc: "NLP-powered document summarization and multi-format file conversion engine with intelligent caching.",
    category: "AI/ML",
    problem: "Manual document processing is slow, error-prone, and doesn't scale. Organizations waste hundreds of hours summarizing reports and converting file formats.",
    solution: "Built an intelligent document processing pipeline using NLP transformers that automatically extracts key insights, generates summaries, and converts between formats—with a 5x speed improvement through semantic caching.",
    features: [
      "NLP-based extractive & abstractive summarization",
      "Multi-format conversion (PDF, DOCX, TXT, HTML)",
      "Intelligent response caching with 5x speedup",
      "Real-time processing with async Django-Flask workers",
      "Interactive progress tracking UI",
      "RESTful API for third-party integration",
    ],
    stack: ["Python", "Django", "Flask", "NLTK", "Transformers", "REST API", "PostgreSQL", "Redis"],
    metrics: ["5x faster processing via NLP caching", "Multi-format support", "Async worker architecture"],
    architecture: "Microservice split: Django serves the web layer + user auth, Flask handles async NLP processing. Redis-backed caching layer intercepts repeated queries. Background task queue manages concurrent file conversions.",
    challenges: "Handling large documents without memory overflow required streaming tokenization. Balancing summarization quality vs. speed led to a hybrid extractive-then-abstractive pipeline.",
    github: "https://github.com/rahullohra",
    live: "#",
  },
  {
    id: "federated-learning",
    title: "Decentralized Federated Learning for Healthcare",
    shortDesc: "Privacy-preserving machine learning system enabling hospitals to collaboratively train models without sharing patient data.",
    category: "AI/ML",
    problem: "Healthcare institutions hold siloed patient data. Regulations prevent data sharing, yet ML models need diverse datasets for accuracy. Traditional centralized training violates patient privacy.",
    solution: "Implemented a federated learning framework where each hospital trains locally on its own data, then securely synchronizes model weights with a central server—achieving 85% accuracy without any raw data leaving the premises.",
    features: [
      "Federated SGDRegressor model training",
      "Privacy-preserving weight aggregation",
      "Client-server synchronization protocol",
      "Model accuracy tracking across rounds",
      "Scalable multi-client architecture",
      "Healthcare-compliant data handling",
    ],
    stack: ["Python", "Scikit-learn", "NumPy", "Socket Programming", "Federated Learning", "SGDRegressor"],
    metrics: ["85% model accuracy", "Zero raw data shared", "Multi-hospital scalability"],
    architecture: "Star topology: Central aggregation server + N client nodes. Each client trains an SGDRegressor on local data, serializes model coefficients, and transmits via TCP sockets. Server performs FedAvg aggregation and broadcasts updated weights.",
    challenges: "Handling non-IID data distributions across hospital nodes required weighted averaging based on dataset size. Network latency management was critical for synchronization rounds.",
    github: "https://github.com/rahullohra",
    live: "#",
  },
];

export const techStack = {
  "AI & Machine Learning": [
    { name: "Python", level: 95 },
    { name: "Scikit-learn", level: 85 },
    { name: "NLTK", level: 80 },
    { name: "NumPy", level: 90 },
    { name: "Pandas", level: 85 },
    { name: "Federated Learning", level: 75 },
    { name: "NLP", level: 80 },
    { name: "Computer Vision", level: 70 },
  ],
  Backend: [
    { name: "Django", level: 90 },
    { name: "Flask", level: 85 },
    { name: "REST APIs", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "Socket Programming", level: 70 },
    { name: "Microservices", level: 75 },
  ],
  Frontend: [
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 90 },
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
  ],
  "Cloud & DevOps": [
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "Linux", level: 80 },
    { name: "CI/CD", level: 70 },
    { name: "Vercel", level: 80 },
    { name: "AWS (Basics)", level: 65 },
  ],
  Databases: [
    { name: "PostgreSQL", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Redis", level: 70 },
    { name: "SQLite", level: 80 },
  ],
};

export const services = [
  {
    title: "AI Development",
    description: "Custom ML models, NLP pipelines, computer vision systems, and AI-powered features integrated into your product.",
    icon: "Brain",
  },
  {
    title: "Full Stack Engineering",
    description: "End-to-end web applications with React/Next.js frontends and Python/Django backends built for scale.",
    icon: "Layers",
  },
  {
    title: "Backend & API Architecture",
    description: "Scalable REST APIs, microservice architectures, database design, and performance optimization.",
    icon: "Server",
  },
  {
    title: "MVP Development",
    description: "Rapid prototyping and MVP builds for startups. From concept to deployed product in weeks, not months.",
    icon: "Rocket",
  },
  {
    title: "AI Consultation",
    description: "Strategic guidance on AI integration, model selection, data pipeline design, and MLOps best practices.",
    icon: "MessageSquare",
  },
  {
    title: "Automation & Tooling",
    description: "Workflow automation, data processing pipelines, and custom developer tools that save hundreds of hours.",
    icon: "Zap",
  },
];

export const processSteps = [
  { step: "01", title: "Discovery", description: "Deep-dive into your problem space, users, and technical constraints." },
  { step: "02", title: "Architecture", description: "System design, tech stack selection, and infrastructure planning." },
  { step: "03", title: "Development", description: "Iterative building with continuous feedback loops and code reviews." },
  { step: "04", title: "Testing", description: "Automated test suites, integration testing, and performance benchmarks." },
  { step: "05", title: "Deployment", description: "CI/CD pipelines, monitoring setup, and production-ready launches." },
  { step: "06", title: "Optimization", description: "Performance tuning, user feedback iteration, and continuous improvement." },
];

export const testimonials = [
  {
    name: "Technical Lead",
    role: "CERT-In, MeitY",
    quote: "Rahul delivered a production-grade application that streamlined our entire contact management workflow. His attention to security and testing was exceptional.",
    avatar: "TL",
  },
  {
    name: "Professor",
    role: "BHU Computer Science",
    quote: "One of the most technically driven students I've mentored. His federated learning project demonstrated real-world applicability of privacy-preserving ML.",
    avatar: "PR",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
