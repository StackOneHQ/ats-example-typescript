import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import stackoneAtsRoutes from './routes/atsRoutes';
import stackoneSessionRoute from './routes/connectRoute';
import stackoneAccountRoute from './routes/accountsRoute'

const app = express();
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/ats', stackoneAtsRoutes);
app.use('/session-token', stackoneSessionRoute);
app.use('/ats', stackoneAccountRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});