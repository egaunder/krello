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
import ApiRoutes from './routes/ApiRoutes';
import authRoutes from './routes/AuthRoutes';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

async function initializeDb(keys) {
  mongoose.Promise = global.Promise;
  await mongoose.connect(keys.mongoUriProd, { useMongoClient: true });
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
app.use('/api/v1/', ApiRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
