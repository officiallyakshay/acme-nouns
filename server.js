const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const { models: { Thing, Person, Place } } = require('./db');

const port = process.env.PORT || 3001;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/things', async ( req, res, next ) => {
  try {
    const thing = await Thing.findAll();
    res.send(thing);
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/people', async ( req, res, next ) => {
  try {
    res.send(await Person.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/places', async ( req, res, next ) => {
  try {
    res.send(await Place.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

db.sync()
  .then(() => {
      app.listen(port, () => console.log(`listening on port ${port}`));
  })