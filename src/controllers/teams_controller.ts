import { Request, Response } from 'express';
import TeamsService from '../services/teams_services';

class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public findAll = async (req: Request, res: Response) => {
    try {
      const x = await this.teamsService.findAll();
      if (x === null) throw new Error();
      else {
        const result = x.map((xx) => ({ id: xx.id, teamName: xx.teamName }));
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(401).json({ message: 'Erro' });
    }
  };

  public findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const x = await this.teamsService.findOne(id);
      if (x === null) throw new Error();
      else {
        const resul = [x].map((xx) => ({ id: xx.id, teamName: xx.teamName }));
        res.status(200).send(resul[0]);
      }
    } catch (err) {
      res.status(401).json({ message: 'Team não encontrado' });
    }
  };
}

export default TeamsController;
