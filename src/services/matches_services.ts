import MetchesModel from '../database/models/MetchesModel';

interface Metches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

class MatchesService {
  constructor(private model = MetchesModel) {}

  public findAll = async () => {
    const x = await this.model.findAll();
    return x;
  };

  public findOne = async (id: string) => {
    const x = await this.model.findOne({ where: { id } });
    return x;
  };

  public async create(metches: Metches) {
    const x = await this.model.create(metches);
    return x;
  }

  public async update(id:number): Promise<[number, Metches[]]> {
    const x = await this.model.update({ inProgress: false }, { where: { id } });
    return x;
  }

  public async updateMatches(id:number, goalsMetche: object): Promise<[number, Metches[]]> {
    const x = await this.model.update(goalsMetche, { where: { id } });
    return x;
  }
}

export default MatchesService;
