import { Schema, model, Model, models } from 'mongoose';
import IUser from '../Interfaces/IUser';

class userModel {
  private schema: Schema;
  private model: Model<IUser>;

  constructor() {
    this.schema = new Schema<IUser>({
      email: { type: String, required: true, max: 100 },
      password: { type: String, required: true, max: 100 },
    },{ versionKey: false});
    this.model = models.User || model('User', this.schema);
  }

  public async addUser(user: IUser): Promise<IUser> {
    return this.model.create({ ...user });
  }

  public async findAll(): Promise<IUser[]> {
    return this.model.find();
  }

  public async findOneByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({email: {$eq: email}});
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    return this.model.findOneAndDelete({_id: {$eq: id}});
  }

  public async findOne(email: string, password: string): Promise<IUser | null> {
    return this.model.findOne({$and: [{email: {$eq: email}}, {password: {$eq: password}}]});
  }

}

export default userModel;