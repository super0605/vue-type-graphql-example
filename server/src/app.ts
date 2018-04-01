import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { sequelize } from './config/database';

import { schema } from './app/routes/graphql/schema';
import { Config } from './config/environments';

import { auth_router } from './app/routes/auth/Authentication';

const env = Config.setConfiguration();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

// Session
const expiryDate = new Date(Date.now() + 1000 * 60 * 30); // 30 min
app.use(session({
  name: 'sid',
  secret: 'hunseol_typescript_graphql',
  resave: false,
  saveUninitialized: true,
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    expires: expiryDate,
  },
}));
app.set('trust proxy', 1);

// GraphQL
app.use('/graphql', graphqlHTTP(async (request) => {
  const startTime = Date.now();
  return {
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
    extensions({ document, variables, operationName, result }) {
      return { result: bodyParser.json(result), variables, operationName, runTime: Date.now() - startTime };
    },
  };
}));

// Router
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/auth', auth_router);

// Run Server
app.listen(env.EXPRESS_PORT, () => {
  console.log('=========================app.ts===========================');
  console.log(`Listening the server ${env.EXPRESS_PORT}`);
  console.log('====================================================');
}).on('error', (err) => {
  console.error(err);
});