import { Router } from 'express';
import urlController from '../controllers/urlController';
import userController from '../controllers/userController';

const routes = Router();

routes.post(
  '/url',
  (req, res, next) => new urlController(req, res, next).addUrl(),
);

routes.get(
  '/url/',
  (req, res, next) => new urlController(req, res, next).findOne(),
);

routes.put(
  '/url/',
  (req, res, next) => new urlController(req, res, next).update(),
);

routes.delete(
  '/url/',
  (req, res, next) => new urlController(req, res, next).delete(),
);


routes.post(
  '/user/',
  (req, res, next) => new userController(req, res, next).addUser(),
);

routes.post(
  '/login/',
  (req, res, next) => new userController(req, res, next).userLogin(),
);

export default routes;
