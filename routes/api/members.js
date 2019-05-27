const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
const ytdl = require('ytdl-core');

// Download Video
router.post('/', (req, res) => {
  console.log('received');
  ytdl(req.body.url)
  .pipe(fs.createWriteStream('./public/video.mp4'));

  setTimeout(function(){
    res.redirect('/');
  }, 15000);
});

module.exports = router;