import { Router } from 'express';
import LoginControllers from '../controllers/login_controller';
import MiddlewareUsers from '../middleware/users_middleware';
import ValidateJWT from '../auth/validateJWT';

const router = Router();
const loginControllers = new LoginControllers();
const middlewareUsers = new MiddlewareUsers();
const validateJWT = new ValidateJWT();
// const booksSlashId = '/pessoas/:id';

router.post(
  '/login',
  middlewareUsers.userValidade,
  loginControllers.findOne,
);
router.get(
  '/login/validate',
  validateJWT.userValidadeToken,
  validateJWT.userValidadeTokenLogin,
  // middlewareUsers.userValidade,
  // loginControllers.findone,
);

export default router;
