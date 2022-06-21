import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard_controller';
// import ValidateJWT from '../auth/validateJWT';

const router = Router();
const leaderboardController = new LeaderboardController();
// const validateJWT = new ValidateJWT();
// const booksSlashId = '/pessoas/:id';

router.get(
  '/leaderboard/home',
  // validateJWT.userValidadeToken,
  // validateJWT.userValidadeTokenLogin,
  // middlewareUsers.userValidade,
  leaderboardController.findAll,
);

export default router;
