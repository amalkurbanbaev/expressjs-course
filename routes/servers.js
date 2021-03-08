import { Router } from 'express';
import { getAll, create, remove} from '../controllers/servers.js'

// Объект маршрутизатора - это изолированный экземпляр промежуточного программного обеспечения и маршрутов. 
// Вы можете думать об этом как о «мини-приложении», способном выполнять только функции промежуточного программного обеспечения и маршрутизации.
// Каждое приложение Express имеет встроенный маршрутизатор приложений
const router = Router();

// Методы router.METHOD () обеспечивают функциональность маршрутизации в Express,
// где METHOD - это один из методов HTTP, таких как GET, PUT, POST и т. д. В нижнем регистре.
// Таким образом, фактическими методами являются router.get (), router.post (), router.put () и так далее.

// создает маршрут (Route) для get запросов, в качество параметра выставляет статус 200, и возвращает имеющуюся дату, 
// и все это контролиррует файл controllers/servers.js
router.get('/api/server', getAll);

// создает маршрут (Route) для post запросов, в качестве параметра формирует предварительный объект с доп. полями (если нужно),
// затем пушит в него тело запроса, таким образом получая готвоый объект для ПОСТА и выставляет статус 201,
// и все это контролиррует файл controllers/servers.js
router.post('/api/server', create);

// создает маршрут (Route) для delete запросов, в маршруте дополнительно передает параметр :id для работы с каждым объектом или полем объекта,
// в качестве параметра обращается к исходным данным (объект, таблица в БД, etc), и с помозью метода filter() (ES6) удаляет необходимую запись по id,
// и все это контролиррует файл controllers/servers.js
router.delete('/api/server/:id', remove);

export default router;