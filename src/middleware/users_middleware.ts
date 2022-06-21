import { Request, Response, NextFunction } from 'express';
import validator = require('email-validator');

class MiddlewareUsers {
  public userValidade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      body: { password, email },
    } = req;

    if (!email) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else if (!password) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else if (!validator.validate(email)) {
      res.status(400).json({ message: 'Incorrect email or password' });
    } else {
      next();
    }
  };
}

export default MiddlewareUsers;
