const path = require('path');

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

const upload = multer({ dest: 'uploads/' });

debugger; //eslint-disable-line
app.post('/file', upload.single('file'), (req, res) => {
  console.log(req.file);
  const { mimetype, encoding } = req.file;
  const size = req.file.size;
  let bytes,
    kilobytes = null;
  megabytes = null;
  if (size > 1000) {
    kilobytes = Number(size / 1000).toFixed(2);
    megabytes = size > 1000000 ? Number(size / 1000000).toFixed(2) : null;
  }

  const response = {
    size: {
      bytes: size,
      kilobytes,
      megabytes
    },
    encoding,
    mimetype
  };

  res.send(response);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
