import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './Routes/routes';
var cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);
app.use(ErrorHandler.handle);

export default app;