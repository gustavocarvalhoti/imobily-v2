import express from 'express';
import 'express-async-errors';
import './database/connection';
import routes from './routes';
import path from 'path';
import errorHandler from './errors/handler';
import cors from 'cors';

const port = 3333;
const app = express();

app.use(cors());
app.use(express.json()); /* For use JSON */
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); /* For use Static Files, Images in this case */
app.use(errorHandler);

app.listen(port);
console.log(`Running on http://localhost:${port}`);