import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();
const PORT = 3900;

app.use(cors());
app.use(express.json());


app.get('/prueba', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Ruta de prueba'
    })
});

app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto ' + PORT);
});
