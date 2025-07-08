import { Application } from 'express';
import morgan from 'morgan';


/** Muestra los logs de cada request entrante entre otros dependiendo el NODE_ENV */
export function morganLogger(app: Application) {
  console.log(`------------ Service in mode:  ${process.env.NODE_ENV} ------------\n\n`);
  app.use(morgan('dev'));
}
