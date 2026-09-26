import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { randomUUID } from 'crypto';

const app = express();

app.use(cors({ exposedHeaders: ['X-Request-Id'] }));

app.use((req, res, next) => {
    const requestId = randomUUID();
    res.locals.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
});

app.use((req, res, next) => {
    console.log(`[${res.locals.requestId}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());