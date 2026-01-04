import 'dotenv/config';
import { connect, disconnect } from './lib/database.js';
import { startMetricsServer } from './lib/metrics.js';
import { logger } from './lib/logger.js';
import app from './app.js';

async function start() {
  try {
    await connect();

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      logger.info({ port }, 'Express server started');
      if (process.env.OPENAI_API_KEY) logger.info('OpenAI API Key detected');
      else logger.warn('No OpenAI API Key found');

      if (process.env.GEMINI_API_KEY) logger.info('Gemini API Key detected');
      else logger.warn('No Gemini API Key found');

      if (process.env.OLLAMA_HOST) logger.info({ host: process.env.OLLAMA_HOST }, 'Ollama Host configured');
      else logger.info('Using default Ollama Host (http://127.0.0.1:11434)');
    });

    startMetricsServer();

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      server.close(async () => {
        await disconnect();
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

start();
