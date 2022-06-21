import { Router } from 'express';
import TeamsControllers from '../controllers/teams_controller';
// import MiddlewareUsers from '../middleware/users_middleware';

const router = Router();
const teamsControllers = new TeamsControllers();
// const middlewareUsers = new MiddlewareUsers();
// const booksSlashId = '/pessoas/:id';

router.get(
  '/teams',
  // middlewareUsers.userValidade,
  teamsControllers.findAll,
);
router.get(
  '/teams/:id',
  // middlewareUsers.userValidade,
  teamsControllers.findOne,
);

export default router;
