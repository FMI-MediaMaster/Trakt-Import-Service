import { Router } from 'express';
import traktController from '@controllers/trakt';

const routes: Router = Router();

routes.get('/:type/:method', traktController.handler);

export default routes;