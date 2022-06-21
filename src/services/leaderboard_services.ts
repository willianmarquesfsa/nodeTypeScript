import MatchesModel from '../database/models/MetchesModel';
import TeamsModel from '../database/models/TeamsModel';

interface sortt {
  name: string,
  totalPoints: string,
  totalGames: string,
  totalVictories: string,
  totalDraws: string,
  totalLosses: string,
  goalsFavor: string,
  goalsOwn: string,
  goalsBalance: string,
  efficiency: string,

}

class LeaderboardServices {
  constructor(
    private matchesModel = MatchesModel,
    private teamsModel = TeamsModel,
  ) {}

  public findAll = async () => {
    const matches = await this.matchesModel.findAll();
    const teamss = await this.teamsModel.findAll();
    const relacionarr = await this.relacionar(matches, teamss);
    // const ii = relacionarr.length;
    return relacionarr;
  };

  public relacionar = async (matches: MatchesModel[], teams: TeamsModel[]) => {
    const xx = teams.map((xxx: TeamsModel) => this.classificao(xxx, matches));
    const sort1 = xx.sort((a, b) => (a.totalPoints < b.totalPoints ? 1 : -1));
    const sort2 = sort1.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.totalVictories < b.totalVictories) {
        return -1;
      } return 1;
    });
    const sort3 = this.sort3(sort2);
    const sort4 = this.sort4(sort3);
    return sort4;
  };

  public sort3 = (sort2:sortt[]) => {
    const result = sort2.sort((a:sortt, b: sortt) => {
      if (a.totalPoints === b.totalPoints
         && Number(a.goalsBalance) > Number(b.goalsBalance)
          && a.totalVictories === b.totalVictories) {
        return -1;
      } return 1;
    });
    return result;
  };

  public sort4 = (sort2:sortt[]) => {
    const result = sort2.sort((a:sortt, b: sortt) => {
      if (a.totalVictories === b.totalVictories
         && Number(a.goalsBalance) === Number(b.goalsBalance)
          && Number(a.goalsFavor) > Number(b.goalsFavor)) {
        return -1;
      } return 1;
    });
    return result;
  };

  public classificao = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = {
      name: xxx.teamName,
      totalPoints: String(this.totalPoints(xxx, matches)),
      totalGames: String(this.totalGames(xxx, matches)),
      totalVictories: String(this.totalVictories(xxx, matches)),
      totalDraws: String(this.totalDraws(xxx, matches)),
      totalLosses: String(this.totalLosses(xxx, matches)),
      goalsFavor: String(this.goalsFavor(xxx, matches)),
      goalsOwn: String(this.goalsOwn(xxx, matches)),
      goalsBalance: String(this.goalsBalance(xxx, matches)),
      efficiency: String(this.efficiency(xxx, matches)),
    };
    return result;
  };

  public efficiency = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const p = this.totalPoints(xxx, matches);
    const j = this.totalGames(xxx, matches);
    const result = (p / (j * 3)) * 100;
    return Math.round(result * 100) / 100;
  };

  public goalsBalance = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = this.goalsFavor(xxx, matches) - this.goalsOwn(xxx, matches);
    return result;
  };

  public goalsOwn = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => v.awayTeamGoals)
      .reduce<number>((a, b) => a + b, 0);
    return result;
  };

  public goalsFavor = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => v.homeTeamGoals)
      .reduce<number>((a, b) => a + b, 0);
    return result;
  };

  public totalLosses = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => this.condPontua(v.homeTeamGoals, v.awayTeamGoals))
      .filter((b) => b === 0).length;
    return result;
  };

  public totalDraws = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => this.condPontua(v.homeTeamGoals, v.awayTeamGoals))
      .filter((b) => b === 1).length;
    return result;
  };

  public totalVictories = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => this.condPontua(v.homeTeamGoals, v.awayTeamGoals))
      .filter((b) => b === 3).length;
    return result;
  };

  public totalGames = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches.filter(
      (c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false,
    ).length;
    return result;
  };

  public totalPoints = (xxx: TeamsModel, matches: MatchesModel[]) => {
    const result = matches
      .filter((c: MatchesModel) => xxx.id === c.homeTeam && c.inProgress === false)
      .map((v) => this.condPontua(v.homeTeamGoals, v.awayTeamGoals))
      .reduce<number>((a, b) => a + b, 0);
    return result;
  };

  public condPontua = (homeTeamGoals: number, awayTeamGoals: number) => {
    if (homeTeamGoals > awayTeamGoals) {
      return 3;
    }
    if (homeTeamGoals === awayTeamGoals) {
      return 1;
    }
    return 0;
  };
}

export default LeaderboardServices;
