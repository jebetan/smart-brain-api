const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const image = require('./controllers/image');

const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'Jibi',
			password: 'secret',
			email: 'jebetan51@gmail.com',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Pablo',
			password: 'bulka',
			email: 'pablo@gmail.com',
			entries: 0,
			joined: new Date()
		},
	],
	login: [
		{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
		}
	]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
	res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
	console.log(hash);
});
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

// // app.put('/image', (req, res) => {
// // 	const { id } = req.body;
// // 	let found = false;
// // 	database.users.forEach(user => {
// // 		if (user.id === id) {
// // 			found = true;
// // 			user.entries++;
// // 			return res.json(user.entries);
// // 	}
// // })
// if (!found) {
// 	res.status(400).json('not found');
// 	}
// })

app.put('image', (req, res) => { image.handleImage(req, res)})

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3001, ()=> {
	console.log('app is running on port 3001');
})
