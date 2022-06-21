import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { Request, Response } from 'express';
import LoginService from '../services/login_services';

const secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });
enum JwtConfig { expiresIn = '7d', algorithm = 'HS256'}

class LoginControllers {
  constructor(private loginService = new LoginService()) {
  }

  public findOne = async (req: Request, res: Response) => {
    const { body: { email, password } } = req;
    try {
      const x = await this.loginService.findOne(email);
      if (x === null) throw new Error();
      else {
        const token = jwt.sign({ data: { email, password } }, secret, JwtConfig);
        const userValidade = this.loginService.loginValidatePassword(
          password,
          x.dataValues.password,
        );
        if (!userValidade) throw new Error();
        const { id, username, role } = x.dataValues;
        res.status(200).json({ user: { id, username, role, email },
          token });
      }
    } catch (err) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  };
}

export default LoginControllers;
