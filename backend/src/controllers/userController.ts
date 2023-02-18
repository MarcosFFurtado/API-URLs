import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import IUser from '../Interfaces/IUser';

class userController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: userService;
  private userAdress: string;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new userService();
    this.userAdress =  this.req.body.email;
  }

  public async addUser() {
    const user: IUser = {
      email: this.req.body.email,
      password: this.req.body.password,
      id: ''
    };
    try {
      const existUser = await this.service.findOneByEmail(this.userAdress);
      if(existUser !== null) return this.res.status(400).json({ message: 'Already in database' });
      const result = await this.service.addUser(user);
      console.log(result);
      return this.res.status(201).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  public async userLogin() {
    try {
      const { email, password } = this.req.body;
      const result = await this.service.userLog(email, password);
      if (!result) return this.res.status(400).json({ message: 'Invalid fields' });
      return this.res.status(200).json({ token: result });
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllUsers() {
    try {
      const result = await this.service.findAll();
      if (!result) return this.res.status(400).json({ message: 'Invalid fields' });
      return this.res.status(200).json({ token: result });
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteUser() {
    try {
      const { id } = this.req.body;
      const result = await this.service.deleteUser(id);
      if (!result) return this.res.status(400).json({ message: 'Invalid fields' });
      return this.res.status(200).json({ token: result });
    } catch (error) {
      this.next(error);
    }
  }
    
}

export default userController;
