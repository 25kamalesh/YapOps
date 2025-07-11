import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/auth.Routes.js';
import dotenv from 'dotenv';
import ENV_VARS from './config/env.js';
import mongoConnect from './lib/mongodb.js';
import ErrorHandler from './Middlewares/error.middleware.js';
import messageRouter from './Routes/message.Routes.js';
import cors from 'cors';
import { app, server, io } from './lib/Socket.js';
import path from 'path';
import client from 'prom-client';

dotenv.config();
const PORT = ENV_VARS.PORT;
const METRICS_PORT = 9100;
const NODE_ENV = ENV_VARS.NODE_ENV;
const __dirname = path.resolve();

const metricsApp = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to the Express server',
});
register.registerMetric(httpRequestCounter);

metricsApp.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

metricsApp.listen(METRICS_PORT, () => {
  console.log(`📊 Prometheus metrics server running on port ${METRICS_PORT}`);
});

app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "https://5cd9-2406-7400-c4-84b3-c41c-ede8-88cc-7539.ngrok-free.app",
    "http://yapster.pbktech.online",
    "https://yapster.pbktech.online"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/messages', messageRouter);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./Frontend/dist")));
/*   app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"));
  }); */
}

app.use(ErrorHandler);

server.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT}`);
  await mongoConnect();
});
