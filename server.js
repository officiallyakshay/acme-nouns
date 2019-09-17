const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

db.sync()
  .then(() => {
      app.listen(port, () => console.log(`listening on port ${port}`));
  })