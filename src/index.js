require('dotenv').config();
const fileUpload = require('express-fileupload');

const express = require('express');
const app = express();

const { initRoutes } = require('./routes/main');
const ApiError = require('./middleware/exeption.middleware');
const db = require('./db/connect');

const PORT = process.env.PORT || 5500;

app.use(express.json());

const start = async () => {
  try {
    await db.sync().then(() => {
      console.log('[OK] DataBase connected!')
    })

    app.use(fileUpload());
  
    initRoutes(app);

    app.use(ApiError);
  
    app.listen(PORT, () => console.log(`[OK] Server runing on PORT: ${ PORT }`));
  } catch(err) {
    console.log(`[ERROR] ${ err }`);
  }
}

start();