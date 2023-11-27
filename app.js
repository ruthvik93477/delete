const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb+srv://ruthvik:ruthvik@cluster1.onhko9g.mongodb.net/ecom');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
  const inputSchema = new mongoose.Schema({
    cn: String,
    clientName: String,
    name: String,
    cf: Number,
    ml: Number,
    jan: Number,
    feb: Number,
    mar: Number,
    apr: Number,
    may: Number,
    jun: Number,
    jul: Number,
    aug: Number,
    sep: Number,
    oct: Number,
    nov: Number,
    dec: Number,
    jan_ml: Number,
    feb_ml: Number,
    mar_ml: Number,
    apr_ml: Number,
    may_ml: Number,
    jun_ml: Number,
    jul_ml: Number,
    aug_ml: Number,
    sep_ml: Number,
    oct_ml: Number,
    nov_ml: Number,
    dec_ml: Number,
    aLeaves: Number,
    mLeaves: Number,
  });
  const InputData = mongoose.model('InputData', inputSchema);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.post('/delete', async (req, res) => {
    const nameToDelete = req.body.name;
    try {
      const result = await InputData.findOneAndDelete({ name: nameToDelete });
      if (result) {
        let a = fs.readFileSync("f.html")
        res.send(a.toString())
      } else {
        let b = fs.readFileSync("n.html")
        res.send(b.toString())
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});
