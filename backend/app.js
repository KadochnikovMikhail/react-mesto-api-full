require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const helmet = require('helmet');
const { AVATAR_REGEX } = require('./constants');
const auth = require('./middlewares/auth');
const cenralErrors = require('./middlewares/central-err');
const {
  createUser, login,
} = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

const { requestLogger, errorLogger } = require('./middlewares/logger');



console.log(process.env.NODE_ENV);

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true, useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
});

app.use(requestLogger);


app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: [
    'https://mesto.firstproject.nomoredomains.xyz',
    'http://mesto.firstproject.nomoredomains.xyz',
    'https://api.mesto.firstproject.nomoredomains.xyz',
    'http://api.mesto.firstproject.nomoredomains.xyz',
    'https://localhost:3000',
    'http://localhost:3000',
  ]
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
    avatar: Joi.string().custom((value, helpers) => {
      if (AVATAR_REGEX.test(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Неправильный путь.'));
});

app.use(errorLogger);

app.use(errors());

app.use(cenralErrors);
app.listen(PORT);
