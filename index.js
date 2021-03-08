import express from 'express'; // фреймворк для работы с серверами в nodejs
import path from 'path'; // нативный модуль nodeJS
import { requestTime, logger } from './middleware.js'; // миддлвэйр функции, для логирования, энкодинг, etc
import serverRoutes from './routes/servers.js';

const __dirname = path.resolve(); // переменная которой присвоили значение текущей рабочей директории сервера
const PORT = process.env.PORT || 3000; // стандартный приём указания рабочего порта
// Создает экспресс-приложение. Функция express() - это функция верхнего уровня, экспортируемая модулем express.
const app = express(); // инциализируем экземпляр сервера expressjs

app.set('view engine', 'ejs'); // расширение представлений приложения (вьюшки) 
app.set('views', path.resolve(__dirname, 'ejs')); // // директория или массив директорий указывающий где хранятся представления приложения
// console.log(app.get('views')); // получает директорию в которой хранятся представляения (вьюшки)

// Метод app.use() получает middleware функцию или просто функцию для выполнения
// Метод express.static встроенная функция middleware программного обеспечения в Express. Он обслуживает статические файлы и основан на serve-static.
// Метод path.resolve() преобразует последовательность путей или сегментов пути в абсолютный путь.
app.use(express.static(path.resolve('static'))); // сообщаем express где хранится статика приложения (вьюшки)
app.use(express.json()); // Это встроенная функция промежуточного программного обеспечения в Express. Он анализирует входящие запросы с полезной нагрузкой JSON и основан на парсере тела.
app.use(express.urlencoded({extended: false})); // Это встроенная функция промежуточного программного обеспечения в Express. Он анализирует входящие запросы с полезной нагрузкой в ​​urlencoded и основан на парсере тела. Позволяет работать с кодировкой URL в стиле JSON
app.use(requestTime); // это разработанное нами middleware ПО (функция которая возвращает время когда был сделан запрос)
app.use(logger); // это разработанное нами middleware ПО (функция которая выводит в консоль верхнюю middleware функцию)

app.use(serverRoutes);

// Метод app.get направляет HTTP запрос на указанный путь. В качестве параметра может принимать callback в котором можно обработать результат гет запроса и сам запрос
app.get('/', (req, res) => {
	res.render('index', {title: 'Main Page', active: 'main'}) // метод res.render() рендерит переданный веб-документ и в качестве опций передает в этот элемент некоторые параметры
})

app.get('/features', (req, res) => {
	res.render('features', {title: 'Features Page', active: 'features'}) // объект передается как параметры для вьюшек
})

// Метод app.listen связывает и прослушивает соединения на указанном хосте и порту.
app.listen(PORT, () => {
	console.log(`Sever has been started on port ${PORT}...`);
});