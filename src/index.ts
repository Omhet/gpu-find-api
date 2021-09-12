import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import cache from 'express-aggressive-cache';

const app = express();

app.use(cors());
app.use(compression());

app.use(
    cache({
        maxAge: 3600,
    }).middleware
);

app.get('/dogs/number', async (_req: Request, res: Response) => {
    const data = {};
    res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
