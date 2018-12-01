import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import isEmpty from '../middlewares/isEmpty';
import isValidLocation from '../middlewares/isValidLocation';
import isValidType from '../middlewares/isValidType';
import isValidComment from '../middlewares/isValidComment';
import RedFlagController from '../controllers/red-flag';

const router = Router();

router.get('/api/v1/red-flags', RedFlagController.getAll);
router.get('/api/v1/red-flags/:id', validateRecordID, RedFlagController.getOne);
router.post('/api/v1/red-flags', isEmpty, isValidLocation, isValidType, isValidComment, RedFlagController.create);
router.patch('/api/v1/red-flags/:id/location', validateRecordID, isEmpty, isValidLocation, RedFlagController.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', validateRecordID, isEmpty, isValidComment, RedFlagController.updateComment);
router.delete('/api/v1/red-flags/:id', validateRecordID, RedFlagController.delete);

export default router;
