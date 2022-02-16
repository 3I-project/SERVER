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
// Порт на котором работает сервер
const PORT = process.env.PORT || 5500;

// Подключение промежуточных обработчиков
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:8080', 'https://frontend-3i.herokuapp.com'],
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
