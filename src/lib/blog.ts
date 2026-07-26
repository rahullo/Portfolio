export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "scaling-nlp-pipelines",
    title: "Scaling NLP Document Pipelines with Semantic Caching",
    excerpt: "How we achieved a 5x speedup in document summarization using transformers, async Flask workers, and intelligent response caching.",
    date: "2025-02-15",
    readingTime: "5 min read",
    category: "AI Engineering",
    content: `
# Scaling NLP Document Pipelines with Semantic Caching

Large document summarization pipelines are inherently expensive. They require reading entire files, chunking the content, tokenizing strings, and passing data through LLMs or transformer models. Doing this synchronously over REST API endpoints inevitably leads to request timeouts and severe server loading.

During the build of my **AI Document Intelligence Platform**, I engineered an asynchronous worker pattern utilizing **Django**, **Flask**, and **Redis** to scale document conversions and summary generations.

## The Architecture
We split the system into two distinct boundary layers:
1. **Web and Auth Gate (Django)**: Serves client assets, stores document metadata in PostgreSQL, and acts as the gatekeeper.
2. **Inference Workers (Flask + Celery)**: Isolated workers hosting HuggingFace pipeline models to perform extractive and abstractive summarization.

## The Semantic Cache Strategy
Instead of running heavy inference for identical documents, we set up a Redis caching layer. We computed a hash of the cleaned document body, using it as a lookup key:
* If the key exists, return the cached summary immediately (**5x speedup**).
* If the key doesn't exist, queue the document for inference and cache the response.

This optimized CPU resource utilization and maintained an average api uptime of **99.9%** even under concurrent document loads.
    `,
  },
  {
    slug: "secure-auth-django-pbkdf2",
    title: "Hardening Backend Systems: Security Lessons from CERT-In",
    excerpt: "Best practices for implementing PBKDF2-SHA256 password hashing, Multi-Factor Authentication, and brute-force protection shields.",
    date: "2025-01-10",
    readingTime: "7 min read",
    category: "Security",
    content: `
# Hardening Backend Systems: Security Lessons from CERT-In

When building web applications for critical operations, security cannot be an afterthought. During my time at **CERT-In** (Indian Computer Emergency Response Team), I designed and deployed contact systems serving over 100 internal stakeholders, where securing sensitive credentials was a primary requirement.

## Password Hashing with PBKDF2-SHA256
We implemented the robust **PBKDF2-SHA256** password hashing algorithm with a custom iteration count exceeding the default standard. This ensures that even if database records are compromised, the passwords remain highly resistant to offline brute-force attacks.

## Multi-Factor Authentication
To further safeguard government stakeholder logins, we coupled basic email credentials with **Multi-Factor Authentication (MFA)**:
1. User logs in with password.
2. Verification code is dispatched dynamically via **Twilio SMS** API.
3. Login is completed only when the OTP validation block is satisfied.

## Brute-Force Shieling
Using **Django Axes**, we set up request trackers that temporarily blacklist IP addresses exceeding five failed login attempts, rendering brute-force scanning ineffective.
    `,
  },
  {
    slug: "federated-learning-healthcare-privacy",
    title: "Collaborative ML Without Data Sharing: A Healthcare Case Study",
    excerpt: "How federated learning with SGDRegressor and FedAvg enables collaborative model training while keeping medical insurance data secure.",
    date: "2024-11-20",
    readingTime: "6 min read",
    category: "Machine Learning",
    content: `
# Collaborative ML Without Data Sharing: A Healthcare Case Study

Healthcare data is highly siloed due to strict privacy regulations. This limits our ability to train large, robust machine learning models because we cannot centralize patient records.

To address this challenge, I designed a **Federated Learning Framework** enabling collaborative training across 5 distributed client nodes without transmitting any raw medical insurance records.

## The Federated Average (FedAvg) Protocol
The architecture follows a star topology:
1. **Clients (Hospital Nodes)**: Train a local **SGDRegressor** model on local data.
2. **Aggregation Server**: Coordinates training rounds, aggregates client weights using the **FedAvg** algorithm, and broadcasts the updated model back to clients.

## Handling Non-IID Data
Data distributions across hospital sites are naturally heterogeneous (non-IID). We resolved this by weighting each client's update based on its local sample size, ensuring larger datasets had proportional influence on global model convergence while preserving patient privacy.
    `,
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug) || null;
}
