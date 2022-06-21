import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard_services';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public findAll = async (req: Request, res: Response) => {
    try {
      const x = await this.leaderboardService.findAll();
      if (x === null) throw new Error();
      else {
        res.status(200).json(x);
      }
    } catch (err) {
      res.status(401).json({ message: 'Erro' });
    }
  };
}

export default LeaderboardController;
