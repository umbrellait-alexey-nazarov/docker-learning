import gracefulShutdownMix from 'http-shutdown';
import logger from 'winston';
import config from '../config';
import httpServerApp from '../src/server';

function onListen() {
  logger.info(`==== HTTP server succesfull run on port: ${config.port} ====`);
}

const nativeHttpSever = httpServerApp.listen(config.port, onListen);
const serverWithShutdown = gracefulShutdownMix(nativeHttpSever);

process.on('SIGINT', () => {
  logger.info('Start Shutdown HttpServer');

  const shutdownCallBackErr = err => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    process.exit(0);
  };

  const timer = setTimeout(() => {
    logger.info('Force shutdown http server by timeout');
    serverWithShutdown.forceShutdown(err => shutdownCallBackErr(err));
  }, config.gracefulStopTimeout);

  serverWithShutdown.shutdown(err => {
    clearTimeout(timer);
    shutdownCallBackErr(err);
  });
});
