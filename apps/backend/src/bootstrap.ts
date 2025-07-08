import { morganLogger } from './middlewares/morganlogger';
import cors from 'cors';
import express, { Application } from 'express';


/** Función que se encarga de inicializar middlewares e instancias singleton para su uso en la aplicación */
export function bootstrap(app: Application) {
  morganLogger(app);
  app.use(cors()); // Cors policy
  app.use(express.json()); // body-parser

  // loggers
  // db
  // etc
}
