const fs = require('fs');
const path = require('path');

const deleteAndSendResponse = (req, res) => {
  if (!req.file) {
    return res.send({ error: 'Please choose a file.' });
  }
  if (typeof req.fileSizeError !== 'undefined') {
    return res.send({ error: 'File too large' }); // to display filesize error
  }
  const { mimetype, encoding } = req.file;
  const size = req.file.size;

  let kilobytes = null;
  let megabytes = null;
  const fileName = req.file.filename;

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

  fs.unlink(path.join(__dirname, `../../../uploads/${fileName}`), err => {
    if (err) {
      console.log(err);
    }
  });

  return res.send(response);
};

module.exports = deleteAndSendResponse;
