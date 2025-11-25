# GEO Flow - AI Search Optimization (AISO) Platform

**GEO Flow** is a specialized dashboard designed to optimize brand visibility within AI Search Engines (DeepSeek, Doubao, ChatGPT, etc.). unlike traditional SEO which focuses on keyword ranking, GEO (Generative Engine Optimization) focuses on **AISOV (AI Share of Voice)**, Citation Authority, and Semantic Association.

![GEO Flow Dashboard](https://via.placeholder.com/1200x600?text=GEO+Flow+Dashboard+Preview)

## 🚀 Background & Goals

Traditional SEO strategies are becoming less effective as users shift towards AI-driven answers. GEO Flow automates the workflow of:
1.  **Discovery**: Understanding what users ask AI about your domain.
2.  **Analysis**: Reverse-engineering which sources (URLs/Domains) AI models cite.
3.  **Creation**: Generating structured, "high-density" content that AI models prefer to ingest.
4.  **Monitoring**: Tracking citation frequency and sentiment.

## 🌟 Key Features

### 1. 📡 Radar (Discovery Agent)
*   **Prompt Fission**: Input a core keyword (e.g., "Enterprise CRM") to generate a matrix of user intent questions (Definitions, Comparisons, Solutions).
*   **Network Trigger Detection**: Predicts if a prompt will trigger a real-time web search (RAG) by the AI model.
*   **Source Reverse-Engineering**: Analyzes top sources cited by AI to determine where you should publish (e.g., Zhihu vs. CSDN vs. Official Docs).

### 2. 🏭 Factory (Content Engine)
*   **GEO-Specific Generation**: Uses the Google Gemini API to generate content specifically structured for AI ingestion.
*   **Mandatory Components**:
    *   **Inverted Pyramid Structure**: Direct answers in the first paragraph.
    *   **Comparison Tables**: Markdown tables highlighting brand advantages (AI models love tables).
    *   **Data Hooks**: Automatic insertion of statistical data to increase citation probability.
    *   **Entity Binding**: Semantically binding your brand name with industry top terms.
*   **Markdown Preview**: Instant preview and one-click copy for publishing.

### 3. 📊 Monitor (Insight Dashboard)
*   **AISOV Tracking**: Monitor your Brand's "Share of Voice" across AI platforms.
*   **Sentiment Analysis**: Detect positive, neutral, or negative hallucinations.
*   **Fact Verification**: Alerts for AI hallucinations (e.g., AI inventing fake pricing).

### 4. 🚀 Distribution Hub
*   (Roadmap) API integrations for automatic publishing to WordPress and CMS platforms based on source analysis.

## 🛠 Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **AI Integration**: Google Gemini API (`@google/genai`)
*   **Visualization**: Recharts
*   **Icons**: Lucide React
*   **Markdown**: React Markdown, Remark GFM

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   A Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/geo-flow.git
    cd geo-flow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Set your Gemini API key in your environment variables.
    *   For local development, create a `.env` file:
        ```
        VITE_API_KEY=your_google_gemini_api_key
        ```
    *   *Note: The current codebase expects `process.env.API_KEY`. If using Vite, ensure your bundler config exposes this or update `services/gemini.ts` to use `import.meta.env.VITE_API_KEY`.*

4.  **Run the application**
    ```bash
    npm start
    ```

## 📖 Workflow Guide

1.  **Go to Radar**: Enter a competitor or product keyword. Click **Activate Radar**.
2.  **Analyze Sources**: Click "Analyze Sources" on high-value prompts to see which domains (Zhihu, CSDN, 36Kr) DeepSeek prefers for that topic.
3.  **Go to Factory**: Copy a prompt from Radar. Fill in your Brand Name and "Product Context" (facts/stats).
4.  **Generate**: Click "Generate GEO Content".
5.  **Publish**: Copy the Markdown content and publish it to the high-authority channels identified in Step 2.
6.  **Monitor**: Check the Dashboard to see if your AISOV increases over time.

## 🗺 Roadmap

*   **Phase 1 (MVP)**: Manual content generation & Source analysis simulation. (Completed)
*   **Phase 2**: Automated real-time scraping of DeepSeek/Perplexity responses.
*   **Phase 3**: RPA Integration for auto-publishing to Zhihu/CSDN.

## 📄 License

MIT License.
