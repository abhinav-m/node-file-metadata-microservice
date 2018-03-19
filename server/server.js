const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const postFileRouter = require('./routes/postFile');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/file', postFileRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
