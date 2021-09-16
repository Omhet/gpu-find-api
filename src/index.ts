import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import cache from 'express-aggressive-cache';
import { getCardsPrices } from './parsers';

const app = express();

app.use(cors());
app.use(compression());

app.use(
    cache({
        maxAge: 30,
    }).middleware
);

app.get('/prices', async (_req: Request, res: Response) => {
    const data = await getCardsPrices();
    res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
