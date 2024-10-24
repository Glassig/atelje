import express from 'express';
export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
usersRouter.get('/cool', function(req, res, next) {
  res.send('cool');
});

