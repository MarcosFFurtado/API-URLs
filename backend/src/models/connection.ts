import mongoose from 'mongoose';
import 'dotenv/config';

// const MONGO_DB = 'mongodb://mongo:7d61gZ9OsL5yzhJ9BJvn@containers-us-west-40.railway.app:5859';
const MONGO_DB = 'mongodb://localhost:27017/trix';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;