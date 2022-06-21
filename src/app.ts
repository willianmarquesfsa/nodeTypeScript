import * as express from 'express';
import * as cors from 'cors';
import LoginRoute from './routes/login_route';
import Teamsroute from './routes/teams_route';
import Matchesroute from './routes/matches_route';
import Leaderboardroute from './routes/leaderboard_route';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    // this.app.use(bodyParser.json());
    // ...
    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(accessControl);
    this.app.use(cors()); // não e entendo esse cor
    this.app.use(express.json());
    this.app.use(LoginRoute);
    this.app.use(Teamsroute);
    this.app.use(Matchesroute);
    this.app.use(Leaderboardroute);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () => {
      console.log(`App Started on ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
