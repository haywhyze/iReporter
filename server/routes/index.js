import { Router } from 'express';
import validateRecordID from '../middlewares/validateRecordID';
import isEmpty from '../middlewares/isEmpty';
import isValidLocation from '../middlewares/isValidLocation';
import isValidComment from '../middlewares/isValidComment';
import RedFlagController from '../controllers/red-flag';
import userIsEmpty from '../middlewares/userIsEmpty';
import verifyToken from '../middlewares/verifyToken';
import UsersController from '../controllers/users';

const router = Router();

router.post('/api/v1/auth/signup', userIsEmpty, UsersController.create);
router.post('/api/v1/auth/signin', UsersController.login);
router.get('/api/v1/red-flags', verifyToken, RedFlagController.getAll);
router.get('/api/v1/red-flags/:id', verifyToken, validateRecordID, RedFlagController.getOne);
router.post('/api/v1/red-flags', verifyToken, isEmpty, isValidLocation, isValidComment, RedFlagController.create);
router.patch('/api/v1/red-flags/:id/location', verifyToken, validateRecordID, isEmpty, isValidLocation, RedFlagController.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', verifyToken, validateRecordID, isEmpty, isValidComment, RedFlagController.updateComment);
router.delete('/api/v1/red-flags/:id', verifyToken, validateRecordID, RedFlagController.delete);

export default router;
