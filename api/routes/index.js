import { Router } from 'express';
import RedFlagController from '../controllers/red-flag';

const router = Router();

router.get('/api/v1/red-flags', RedFlagController.getAll);
// router.get('/api/v1/red-flags/:id', RedFlagController.getOne);
// router.post('/api/v1/red-flags', RedFlagController.create);
// router.patch('/api/v1/red-flags/:id/location', RedFlagController.updateLocation);
// router.patch('/api/v1/red-flags/:id/comment', RedFlagController.updateComment);
// router.delete('/api/v1/red-flags/:id', RedFlagController.delete);

export default router;
