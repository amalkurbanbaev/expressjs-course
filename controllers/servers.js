let servers = [
	{id: '1', name: 'AWS', status: 'working'},
	{id: '2', name: 'Google Cloud', status: 'working'},
	{id: '3', name: 'Yandex Cloud', status: 'working'},
	{id: '4', name: 'Microsoft', status: 'pending'},
]

export const getAll = (req, res) => {
	res.status(200).json(servers); // Устанавливает статус HTTP для ответа. Это цепочный псевдоним nodeJS response.statusCode.
}

export const create = (req, res) => {
	// формируем объект который будем постить
	const newServer = {
		id: Date.now().toString(), // обязательно id для БД
		...req.body // распакованный объект с телом запроса КОТОРЫЙ пришел сюда из ФРОНТА (VueJS) - {name: "123", status: "created"}. На фронте через fetch делаем post запрос на серверный url /api/server
	}
	servers.push(newServer); // пушим в наш объект который собираемся постить заготовленный объект для примера
	res.status(201).json(newServer); // ставим статус (201 Created) в наш ответ, данные джейсоним
}

export const remove = (req, res) => {
	console.log('ID: ', req.params.id); // понимает что в нашем запросе (Header Requests) есть id который передаем
	servers = servers.filter(s => s.id !== req.params.id); // удаляем через фильтр запись из объекта (или БД) по id. В эту функцию с фрона передали id записи из нашего объекта (БД). Использовали метод ES6 - фильтр для удаления.
	res.json({message: 'Server has been removed'});
}