const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/api/orders', (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const userOrders = router.db.get('orders')
	const paginatedOrders = userOrders.slice(startIndex, endIndex)

	res.json({
		totalOrders: userOrders.length,
		totalPages: Math.ceil(userOrders.length / limit),
		currentPage: page,
		orders: paginatedOrders,
	});
});

server.post('/api/user', (req, res) => {
	const userId = req.body.data.userId
	const user = router.db.get('users').find({id: parseInt(userId) }).value()

	if (user) {
		res.json(user)
	} else {
		res.status(404).json({message: 'User not found'})
	}
})

server.get('/api/item', (req, res) => {
	const itemId = parseInt(req.query.id, 10)
	const item = router.db.get('items').find({ id: itemId }).value()

	if (item) {
		res.json(item)
	} else {
		res.status(404).json({ message: 'Item not found' })
	}
})

server.use(router)
server.listen(5001, () => {
	console.log('JSON Server is running')
})