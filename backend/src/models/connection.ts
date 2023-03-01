import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB = 'mongodb://mongo:lbAlARrolpeFrdEiUrja@containers-us-west-196.railway.app:6870';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
