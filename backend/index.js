import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressSession from 'express-session';

import router from './routes/index';
// import { setupPassport } from './config/index';
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
// const passport = setupPassport();
// app.use(passport.initialize());
// app.use(passport.session());
const MONGODB_URI = 'mongodb://localhost:27018/node_auth';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', router);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
