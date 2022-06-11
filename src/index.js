require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer')
// Создание экземпляра express
const express = require('express');
const app = express();

const { initRoutes } = require('./routes/main');
const db = require('./db/connect');
const path = require("path");
// Порт на котором работает сервер
const PORT = 5500;

// Подключение промежуточных обработчиков
app.use('/apiV1/avatar', express.static(path.resolve(__dirname, '../static/avatars')))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:8080', 'https://frontend-3i.herokuapp.com', 'http://localhost:6500'],
  credentials: true,
}));

const start = async () => {
  // Подключение БД
  try {
    await db.sync().then(() => {
      console.log('[OK] DataBase connected!')
    })
    app.use(require('./middleware/response.middleware'));
    // Подключение инициализация маршрутов
    initRoutes(app);
    // Запуск сервера
    app.listen(PORT, () => console.log(`[OK] Server runing on PORT: ${ PORT }`));
  } catch(err) {
	  console.log(`[ERROR] ${ err }`);
  }
}
start();
