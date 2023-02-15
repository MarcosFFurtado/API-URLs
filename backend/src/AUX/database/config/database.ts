// import 'dotenv/config';
// import { Options } from 'sequelize';

// const config: Options = {
//   username:  'root',
//   password:  'password',
//   database: 'urlManager',
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',

//   logging: false,
// }

// export default config;

import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: 'urlManager',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
