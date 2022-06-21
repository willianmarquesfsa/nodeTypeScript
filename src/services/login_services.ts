// ./services/books.service.ts

import { compareSync, hash } from 'bcryptjs';

import UserModel from '../database/models/UserModel';
// import Login from '../interfaces/login_interface';
// import { NotFoundError } from 'restify-errors';

class LoginService {
  constructor(private model = UserModel) {
  }

  public findOne = async (email: string) => {
    const x = await this.model.findOne({ where: { email } });
    return x;
  };

  public loginValidatePassword = (passwordRecebido: string, passwordDB: string) => {
    const x = compareSync(passwordRecebido, passwordDB);
    return x;
  };

  public gerHash = () => {
    const x = hash('123', 1);
    return x;
  };
}

export default LoginService;

// const books = await UserModel.findAll({ raw: true });
// console.table(books);
// process.exit(0);
