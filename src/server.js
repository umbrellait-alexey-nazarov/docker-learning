import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'koa-cors';
import mongoose from 'mongoose';
import winston from 'winston';
import logger from './libs/logger';
import config from '../config';
import router from './routes'

mongoose.connect(config.dbUri, { useNewUrlParser: true, useFindAndModify: false }, err => {
  if (err) winston.error(err.toString());
  else winston.info('Succesfull Connected to database');
});

const corsOptions = {
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
  credentials: true,
};
const app = new Koa();
app.proxy = true;
app.silent = false;
app.use(cors(corsOptions));
app.use(koaBody());

app
    .use(router.routes())
    .use(router.allowedMethods())

app.on('error', (err, ctx) => {
  if (err.logged || ctx.status >= 500) {
    winston.error({
      err,
      req: ctx.request,
      res: ctx.response,
    });
  }
});

export default app;
