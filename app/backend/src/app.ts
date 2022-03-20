import * as express from 'express';
import * as cors from 'cors';
import * as Login from './database/controllers/LoginControllers';
import * as Club from './database/controllers/ClubControllers';
import * as Match from './database/controllers/MatchsControllers';
import ValidateLogin from './database/controllers/middlewares/ValidateLogin';
import validateId from './database/controllers/middlewares/ValidateClub';

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
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  public start(PORT: string | number):void {
    this.app.route('/login').post(ValidateLogin, Login.checkLogin);
    this.app.route('/login/validate').get(Login.validate);
    this.app.route('/clubs').get(Club.getTeams);
    this.app.route('/clubs/:id').get(validateId, Club.getTeamById);
    this.app.route('/matchs').get(Match.getMatchs);
    this.app.route('/matchs/:inProgress').get(Match.getMatchsByProgress);
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
