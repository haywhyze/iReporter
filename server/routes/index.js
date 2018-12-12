import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import isEmpty from '../middlewares/isEmpty';
import isValidLocation from '../middlewares/isValidLocation';
import isValidComment from '../middlewares/isValidComment';
import RedFlagController from '../controllers/red-flag';
import userIsEmpty from '../middlewares/userIsEmpty';
import UsersController from '../controllers/users';
import validateUserInput from '../middlewares/validateUserInput';

const router = Router();

// Sign up Route
router.post('/api/v1/auth/signup', userIsEmpty, validateUserInput, UsersController.create);

// RedFlag Routes
router.get('/api/v1/red-flags', RedFlagController.getAll);
router.get('/api/v1/red-flags/:id', validateRecordID, RedFlagController.getOne);
router.post('/api/v1/red-flags', isEmpty, isValidLocation, isValidComment, RedFlagController.create);
router.patch('/api/v1/red-flags/:id/location', validateRecordID, isEmpty, isValidLocation, RedFlagController.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', validateRecordID, isEmpty, isValidComment, RedFlagController.updateComment);
router.delete('/api/v1/red-flags/:id', validateRecordID, RedFlagController.delete);

export default router;