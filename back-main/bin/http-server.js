import gracefulShutdownMix from 'http-shutdown';
import winston from 'winston';
import config from '../config';
import httpServerApp from '../src/server';
import logger from '../src/libs/logger';
import connectDb from '../src/libs/db';

function onListen() {
  winston.info(`==== HTTP server succesfull run on port: ${config.port} ====`);
}

const nativeHttpSever = httpServerApp.listen(config.port, onListen);
const serverWithShutdown = gracefulShutdownMix(nativeHttpSever);

const startServer = () => {
  process.on('SIGINT', () => {
    winston.info('Start Shutdown HttpServer');
  
    const shutdownCallBackErr = err => {
      if (err) {
        winston.error(err);
        process.exit(1);
      }
  
      process.exit(0);
    };
  
    const timer = setTimeout(() => {
      winston.info('Force shutdown http server by timeout');
      serverWithShutdown.forceShutdown(err => shutdownCallBackErr(err));
    }, config.gracefulStopTimeout);
  
    serverWithShutdown.shutdown(err => {
      clearTimeout(timer);
      shutdownCallBackErr(err);
    });
  })
}

connectDb()
  .on('error', console.log)
  .on('disconnect', connectDb)
  .once('open', startServer)
