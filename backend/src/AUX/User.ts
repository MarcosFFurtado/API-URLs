import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;
