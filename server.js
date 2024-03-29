const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const db = require('./config/db')
const app = express();
var cors = require('cors')

app.use(cors())
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }))

const client = new MongoClient(db.url, { useNewUrlParser: true ,  useUnifiedTopology: true })
client.connect(err => {
  if (err) return console.log(err)
  const db = client.db("notes")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
})
