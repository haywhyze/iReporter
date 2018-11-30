import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import RedFlagController from '../controllers/red-flag';

const router = Router();

router.get('/api/v1/red-flags', RedFlagController.getAll);
router.get('/api/v1/red-flags/:id', validateRecordID, RedFlagController.getOne);
// router.post('/api/v1/red-flags', RedFlagController.create);
router.patch('/api/v1/red-flags/:id/location', validateRecordID /* , RedFlagController.updateLocation */);
router.patch('/api/v1/red-flags/:id/comment', validateRecordID /* , RedFlagController.updateComment */);
router.delete('/api/v1/red-flags/:id', validateRecordID /* , RedFlagController.delete */);

export default router;
