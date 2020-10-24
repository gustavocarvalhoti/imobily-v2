import {Router} from 'express';
import OrphanagesController from './controllers/OrphanagesController';
import RealStateController from './controllers/RealStateController';
import multer from 'multer';
import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.getById);

routes.get('/real-state', RealStateController.index);
routes.post('/real-state', upload.array('images'), RealStateController.create);

export default routes;