import express, {Router} from 'express';
export const indexRouter: Router = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

