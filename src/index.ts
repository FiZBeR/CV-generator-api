import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import route from './routes/cv.route.js';
import { setupSwagger } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3900;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/', route);

app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto ' + PORT);
});
