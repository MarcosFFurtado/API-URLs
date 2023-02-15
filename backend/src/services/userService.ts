import userModel from '../models/userModel';
import IUser from '../Interfaces/IUser';
import User from '../Domain/user';
const { createToken } = require('../auth/validateJWT');

class userService {
  // private service: urlModel

  // constructor () {
  //   this.service = new urlModel();
  // }

  private createUserDomain(user: IUser | null): User | null {
    if (user) {
      return new User(
      user.id,
      user.password,
      user.email
      );
    }
    return null;
  }

  public async addUser(user: IUser): Promise<any> {
    const userMd = new userModel();
    const newuser = await userMd.addUser(user);
    if (newuser) {
      const token = createToken(newuser.id);
      return token;
    }
    return null;
  }


  public async userLog(email: string, password: string): Promise<IUser | null> {
    const userMd = new userModel();
    const result = await userMd.findOne(email, password);
    if (result) {
      const token = createToken(result.id);
      return token;
    }
    return result;
  }

  public async findOneByEmail(email: string): Promise<IUser | null> {
    const urlMd = new userModel();
    const newUrl = await urlMd.findOneByEmail(email);
    return newUrl;
  }
}

export default userService;
