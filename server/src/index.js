// *** Main Dependencies *** //
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser'
import expressDevice from 'express-device';
import mongoose, { mongo } from 'mongoose';

import keys from './config/keys';

// *** Routes *** //
import ApiRoutes from './routes/ApiRoutes';


const ENVIRONMENT = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;

initializeDb(keys, ENVIRONMENT);

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(expressDevice.capture());
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// Setup routes
app.use('/api/v1/', ApiRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


async function initializeDb(keys, env) {
  mongoose.Promise = global.Promise;
    await  mongoose.connect(keys.mongoUriProd, { useMongoClient: true });
}