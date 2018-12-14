import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import isEmpty from '../middlewares/isEmpty';
import isValidLocation from '../middlewares/isValidLocation';
import isValidComment from '../middlewares/isValidComment';
import isValidStatus from '../middlewares/isValidStatus';
import isAdmin from '../middlewares/isAdmin';
import isNotAdmin from '../middlewares/isNotAdmin';
import justAdmin from '../middlewares/justAdmin';
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
router.get('/api/v1/red-flags', verifyToken, isAdmin, IncidentController.getAllByUser);
router.get('/api/v1/red-flags/:id', verifyToken, isAdmin, validateRecordID, IncidentController.getOneByUser);
router.post('/api/v1/red-flags', verifyToken, isNotAdmin, isEmpty, isValidLocation, isValidComment, IncidentController.create);
router.patch('/api/v1/red-flags/:id/location', verifyToken, isNotAdmin, validateRecordID, isEmpty, isValidLocation, IncidentController.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', verifyToken, isNotAdmin, validateRecordID, isEmpty, isValidComment, IncidentController.updateComment);
router.delete('/api/v1/red-flags/:id', verifyToken, isNotAdmin, validateRecordID, IncidentController.delete);
// only admin access
router.patch('/api/v1/red-flags/:id/status', verifyToken, justAdmin, validateRecordID, isEmpty, isValidStatus, IncidentController.updateStatus);

// Intervention Routes
router.get('/api/v1/interventions', verifyToken, isAdmin, IncidentController.getAllByUser);
router.get('/api/v1/interventions/:id', verifyToken, isAdmin, validateRecordID, IncidentController.getOneByUser);
router.post('/api/v1/interventions', verifyToken, isAdmin, isEmpty, isValidLocation, isValidComment, IncidentController.create);
router.patch('/api/v1/interventions/:id/location', verifyToken, isNotAdmin, validateRecordID, isEmpty, isValidLocation, IncidentController.updateLocation);
router.patch('/api/v1/interventions/:id/comment', verifyToken, isNotAdmin, validateRecordID, isEmpty, isValidComment, IncidentController.updateComment);
router.delete('/api/v1/interventions/:id', verifyToken, isNotAdmin, validateRecordID, IncidentController.delete);
// only admin access
router.patch('/api/v1/interventions/:id/status', verifyToken, justAdmin, validateRecordID, isEmpty, isValidStatus, IncidentController.updateStatus);

export default router;
