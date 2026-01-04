import client from 'prom-client';
import http from 'http';

const collectDefault = client.collectDefaultMetrics;
collectDefault();

export const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});

export function startMetricsServer() {
  const port = process.env.METRICS_PORT || 9100;
  http.createServer(async (req, res) => {
    if (req.url === '/metrics') {
      res.setHeader('Content-Type', client.register.contentType);
      res.end(await client.register.metrics());
    } else {
      res.writeHead(404);
      res.end();
    }
  }).listen(port);
  console.log(`Metrics server listening on ${port}`);
}