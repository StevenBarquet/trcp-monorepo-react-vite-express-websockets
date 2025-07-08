import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { AppRouter, appRouter } from './src/trcp/app-router';
import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { createTRPCContext } from 'src/trcp-context';

const app = express();
app.use(cors());
app.use(express.json()); // body-parser

// ---- Endpoints REST normales ----------------------
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// ---- tRPC Routers -----------------------------
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

// Levantamos servidor HTTP a partir de Express
const server = http.createServer(app);

// ws server
const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

// setInterval(() => {
//   console.log('Connected clients', wss.clients.size);
// }, 1000);
server.listen(2022);
