import fs from 'fs';
import express from 'express';
import satoriFunc from './satori';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'image/png' // drop Content-Length as it should be automatically added by express
  });
  res.end(await satoriFunc());
});

app.listen(3006, () => {
    console.log('Server is running on port 3006');
})