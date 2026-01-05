# intell-unnati

![Project Banner](https://via.placeholder.com/1200x300?text=intell-unnati)

**intell-unnati** is a comprehensive full-stack AI application designed to act as an intelligent assistant hub. It integrates multiple AI agents, including a conversational chat assistant, a news aggregator, and a smart calculator, all wrapped in a modern, responsive user interface.

## Features

- **AI Chat Agent**: A robust conversational interface powered by advanced LLMs (Gemini, Ollama, OpenAI) for natural language interactions.
- **News Feed Agent**: Stays up-to-date with the latest headlines, aggregating news from various sources.
- **Calculator Agent**: An intelligent calculator capable of solving complex mathematical queries.
- **n8n Integration**: Designed to work seamlessly with **n8n** workflows for advanced automation and data processing pipelines.
- **Modern UI**: A sleek, responsive design built with React and Tailwind CSS, featuring glassmorphism elements and smooth transitions.
- **Secure Backend**: Built on Node.js and Express with rate limiting and security headers (Helmet).

## Tech Stack

### Client
- **Framework**: [React](https://react.dev/) (v19) via [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM (v7)

### Server
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **AI Integration**:
  - Google Generative AI (Gemini)
  - Ollama (Local LLMs)
  - OpenAI API
- **Utilities**: CORS, Dotenv, Pisa (Logger), Prom-client (Metrics)

### Automation
- **Workflow Automation**: [n8n](https://n8n.io/)

## 📦 Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- (Optional) n8n installed globally or running via Docker

### 1. Clone the repository
```bash
git clone https://github.com/your-username/intell-unnati.git
cd intell-unnati
```

### 2. Setup Server
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory based on `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/intell-unnati
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
# Add other keys as needed
```

Start the server:
```bash
npm run dev
```

### 3. Setup Client
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

## Usage

### Running n8n Workflows
This project supports integration with n8n for automating background tasks.
1. **Install n8n**: `npm install n8n -g`
2. **Start n8n**: `n8n start`
3. **Connect**: Configure n8n Webhook nodes to interact with the `intell-unnati` API endpoints.
4. **Import Workflows**: (If you have exported workflows, verify them here).

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
