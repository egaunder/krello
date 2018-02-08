// *** Main Dependencies *** //
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressDevice from 'express-device';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import path from 'path';
import configKeys from './config/keys';
import './services/passport';


// *** Routes *** //
import apiRoutes from './routes/apiRoutes';
import authRoutes from './routes/authRoutes';

const startServer = async () => {
  const ENVIRONMENT = process.env.NODE_ENV || 'development';
  const PORT = process.env.PORT || 5000;

  async function initializeDb(keys) {
    mongoose.Promise = global.Promise;
    await mongoose.connect(keys.mongoUriProd);
  }

  initializeDb(configKeys, ENVIRONMENT);

  const app = express();
  app.use(compression());
  app.use(cookieParser());
  app.use(expressDevice.capture());
  app.use(bodyParser.json({ limit: '20mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [configKeys.cookieKey],
  }));

  // *** setup authentication *** /
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.resolve(__dirname, '../../', 'client', 'build')));

  // Setup routes
  authRoutes(app);
  apiRoutes(app);

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`Server running of port ${PORT}`);
      resolve(server);
    });
  });
};

export default startServer;
