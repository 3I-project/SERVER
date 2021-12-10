require('dotenv').config();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const { initRoutes } = require('./routes/main');
const db = require('./db/connect');

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));

const start = async () => {
  try {
    await db.sync().then(() => {
      console.log('[OK] DataBase connected!')
    })

    initRoutes(app);

    app.listen(PORT, () => console.log(`[OK] Server runing on PORT: ${ PORT }`));
  } catch(err) {
    console.log(`[ERROR] ${ err }`);
  }
}

start();
