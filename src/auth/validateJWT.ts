// ./auth/validateJWT.js
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
// import { request } from 'http';
// import * as jwt from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import User from '../database/models/UserModel';

// const jwt = require('jsonwebtoken');
// const { User } = require('../database/models/UserModel');

const segredo = readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

interface email {
  email: string
}

interface decoded {
  data: email
}

interface Reqdados extends Request {
  user?: User,
  token?: string,
}

class ValidateJWT {
  constructor(private user = User, private jwt = verify) {
  }

  public verif(token:string) {
    const x = this.jwt(token, segredo) as decoded;
    return x;
  }

  public userValidadeToken = async (req: Reqdados, res: Response, next: NextFunction) => {
    const token = req.headers[`${'authorization'}`];
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const { data: { email } } = this.verif(token);
      const userr = await this.user.findOne({ where: { email },
      });
      if (!userr) {
        return res
          .status(401)
          .json({ message: 'Erro ao procurar usuário do token.' });
      }
      req.user = userr;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };

  public userValidadeTokenLogin = async (req: Reqdados, res: Response) => {
    res.status(200).send(req.user?.dataValues.role);
  };
}

export default ValidateJWT;
