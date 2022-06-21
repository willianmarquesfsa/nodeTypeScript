import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  constructor(private model = TeamsModel) {
  }

  public findAll = async () => {
    const x = await this.model.findAll();
    return x;
  };

  public findOne = async (id: string) => {
    const x = await this.model.findOne({ where: { id } });
    return x;
  };
}

export default TeamsService;
