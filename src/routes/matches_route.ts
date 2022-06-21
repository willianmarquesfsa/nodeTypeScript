import { Router } from 'express';
import MatchesControllers from '../controllers/matches_controller';
import MiddlewareTeams from '../middleware/teams_middleware';
import ValidateJWT from '../auth/validateJWT';

const router = Router();
const matchesControllers = new MatchesControllers();
const validateJWT = new ValidateJWT();
const middlewareTeams = new MiddlewareTeams();

router.get(
  '/matches',
  // validateJWT.userValidadeToken,
  matchesControllers.findAll,
);

router.post(
  '/matches', // :id',
  validateJWT.userValidadeToken,
  middlewareTeams.falsEqualTeamsValidade,
  middlewareTeams.falsTeamsTableValidade,
  matchesControllers.create,
);

router.patch(
  '/matches/:id/finish/', // :id',
  validateJWT.userValidadeToken,
  matchesControllers.updateInprogress,
);

router.patch(
  '/matches/:id', // :id',
  validateJWT.userValidadeToken,
  matchesControllers.updateMatches,
);

export default router;
