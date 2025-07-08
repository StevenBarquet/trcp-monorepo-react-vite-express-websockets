import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { AppRouter, appRouter } from './src/trcp/app-router';
import { WebSocketServer } from 'ws';
import express, { Application } from 'express';
import http from 'http';
import { createTRPCContext } from 'src/trcp-context';
import { bootstrap } from 'src/bootstrap';

/** Main wrapper */
async function main() {
  // ---------------- CONFIG
  const app: Application = express();
  // ---------------- BOOTSTRAP
  await bootstrap(app);

  // ---------------- REST ENDPOINTS
  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  // ---------------- tRPC ROUTERS
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );


  // ---------------- HTTP SERVER
  const server = http.createServer(app); // Can be HTTP or HTTPS

  // ---------------- WS SERVER
  const wss = new WebSocketServer({ server });
  applyWSSHandler<AppRouter>({
    wss,
    router: appRouter,
    createContext: createTRPCContext,
  });

  wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });

  // setInterval(() => {
  //   console.log('Connected clients', wss.clients.size);
  // }, 1000);

  server.listen(2022, () => {
    console.log('listening on port 2022');
  });

  return {
    app,
    wss,
  };
}

main()
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  .catch(async (e) => {
    console.error(e);
    // await prisma.$disconnect();
    process.exit(1);
  });
