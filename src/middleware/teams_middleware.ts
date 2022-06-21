import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/teams_services';

class MiddlewareTeams {
  constructor(private matchesService = new MatchesService()) {}
  public falsEqualTeamsValidade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      body: { homeTeam, awayTeam },
    } = req;

    if (homeTeam === awayTeam) {
      res.status(401).json({ message: 'It is not possible to'
      + ' create a match with two equal teams' });
    } else {
      next();
    }
  };

  public falsTeamsTableValidade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      body: { homeTeam, awayTeam },
    } = req;

    const homeTeamExist = await this.matchesService.findOne(homeTeam);
    const awayTeamExist = await this.matchesService.findOne(awayTeam);

    if (homeTeamExist === null || awayTeamExist == null) {
      res.status(404).json({ message: 'There is no team with such id!' });
    } else {
      next();
    }
  };
}

export default MiddlewareTeams;
