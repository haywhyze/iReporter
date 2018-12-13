import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import isEmpty from '../middlewares/isEmpty';
import isValidLocation from '../middlewares/isValidLocation';
import isValidComment from '../middlewares/isValidComment';
import userIsEmpty from '../middlewares/userIsEmpty';
import UsersController from '../controllers/users';
import validateUserInput from '../middlewares/validateUserInput';
import userInfoExist from '../middlewares/userInfoExist';
import verifyToken from '../middlewares/verifyToken';
import IncidentController from '../controllers/incident';

const router = Router();

// Sign up Route
router.post('/api/v1/auth/signup', userIsEmpty, validateUserInput, userInfoExist, UsersController.create);
router.post('/api/v1/auth/login', UsersController.login);

// RedFlag Routes
router.get('/api/v1/red-flags', verifyToken, IncidentController.getAllByUser);
router.get('/api/v1/red-flags/:id', verifyToken, validateRecordID, IncidentController.getOneByUser);
router.post('/api/v1/red-flags', verifyToken, isEmpty, isValidLocation, isValidComment, IncidentController.create);
// router.patch('/api/v1/red-flags/:id/location', validateRecordID, isEmpty, isValidLocation, RedFlagController.updateLocation);
// router.patch('/api/v1/red-flags/:id/comment', validateRecordID, isEmpty, isValidComment, RedFlagController.updateComment);
// router.delete('/api/v1/red-flags/:id', validateRecordID, RedFlagController.delete);

export default router;
