// *** Main Dependencies *** //
import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import bodyParser from 'body-parser'
import expressDevice from 'express-device'
import mongoose from 'mongoose'
import passport from 'passport'
import logger from 'loglevel'
import path from 'path'
import cors from 'cors'

import configKeys from './config/keys'
import './services/passport'


// *** Routes *** //
import authRoutes from './routes/authRoutes'
import boardRoutes from './routes/boardRoutes'
import listRoutes from './routes/listRoutes'
import itemRoutes from './routes/itemRoutes'
import testRoutes from './routes/testRoutes'

const startServer = async ({ port = 5000 } = {}) => {
  const ENVIRONMENT = process.env.NODE_ENV || 'development'

  async function initializeDb(keys, env) {
    mongoose.Promise = global.Promise
    if (env === 'production') {
      await mongoose.connect(keys.mongoUriProd)
    } else {
      await mongoose.connect(keys.mongoUriDev)
    }
  }

  initializeDb(configKeys, ENVIRONMENT)

  const app = express()
  app.use(cors())
  app.use(compression())
  app.use(cookieParser())
  app.use(expressDevice.capture())
  app.use(bodyParser.json({ limit: '20mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

  // *** setup authentication *** /
  app.use(passport.initialize())
  app.use(express.static(path.resolve(__dirname, '../../', 'client', 'build')))

  // Setup routes
  app.use('/test', testRoutes)
  app.use('/auth', authRoutes)
  app.use('/api/boards', boardRoutes)
  app.use('/api/lists', listRoutes)
  app.use('/api/items', itemRoutes)

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => new Promise(resolveClose => {
        originalClose(resolveClose)
      })
      resolve(server)
    })
  })
}

export default startServer
