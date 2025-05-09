import { Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {});
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
}

bootstrap();
