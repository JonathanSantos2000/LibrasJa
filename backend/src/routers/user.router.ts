import { Router } from 'express';
import * as userController from '../controllers/user.controllers';

const router: Router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;

