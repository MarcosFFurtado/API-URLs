import { DataTypes, Model } from 'sequelize';
import db from '.';
import User from './User';

class Url extends Model {
  declare id: number;
  declare description: string;
  declare url: string;
  declare userId: number;
}

Url.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Url',
  tableName: 'urls',
});

User.hasMany(
  Url,
  { foreignKey: 'UserId', as: 'userID' },
);

Url.belongsTo(
  User,
  { foreignKey: 'UserId', as: 'urlUser' },
);

export default Url;
