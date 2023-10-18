import express from 'express';

export const app = express();


app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hello World (express)!');
    res.end();
});

