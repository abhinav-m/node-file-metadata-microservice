const express = require('express');
const multer = require('multer');

const deleteAndSendResponse = require('./middleware/deleteAndSendResponse');

const postFileRouter = express.Router();
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1000000
  }
});

postFileRouter.post('', [upload.single('file'), deleteAndSendResponse]);

module.exports = postFileRouter;
