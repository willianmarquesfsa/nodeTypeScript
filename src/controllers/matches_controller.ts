import { Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';
import Metches from '../database/models/MetchesModel';
import MatchesService from '../services/matches_services';
import TeamsService from '../services/teams_services';

class MatchesControllers {
  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
  ) {}

  public updateInprogress = async (req: Request, res: Response) => {
    const { params: { id } } = req;
    const result = await this.matchesService.update(Number(id));
    res.status(200).json(result);
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { params: { id }, body } = req;
    const result = await this.matchesService.updateMatches(Number(id), body);
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.matchesService.create(body);
    res.status(201).json(result);
  };

  public findAll = async (req: Request, res: Response) => {
    try {
      const x = await this.matchesService.findAll();
      const teamss = await this.teamsService.findAll();
      if (x === null) throw new Error();
      else {
        const result = x.map((xx) =>
          this.findResul(
            xx,
            teamss.find((c) => c.id === xx.homeTeam),
            teamss.find((c) => c.id === xx.awayTeam),
          ));
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(401).json({ message: 'Erro' });
    }
  };

  public findResul = (
    xx: Metches,
    homeTeamc: Teams | undefined,
    awayTeamc: Teams | undefined,
  ) => {
    const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = xx;
    return {
      id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
      teamHome: { teamName: homeTeamc?.teamName },
      teamAway: { teamName: awayTeamc?.teamName },
    };
  };

  /*

  private addresult = (xx: Metches, teamss: Teams | undefined) => {
    const { homeTeam } = xx;
    const xxx = teamss.filter((x) => x.id === homeTeam);
    // const xxxs = teamss.filter((x) => x.id === awayTeam);
    console.log(xxx);
  };
*/
}

export default MatchesControllers;
