const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

//Middleware that parses the JSON body into JS that we can read
app.use(express.json());
//Using cors
app.use(cors());

const database = {
	users: [
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		password: 'bananas',
		email: 'sally@gmail.com',
		entries: 0,
		joined: new Date()
	}
	],

	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com' 
	}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

// Sign-In
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
		
		//res.status(404).json({ email: req.body.email,  password: req.body.password});
	}
})

// Register
app.post('/register', (req, res) => {
	const {email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1])
})

//Getting the users homepage
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if (!found){
		res.status(400).json('not found')
	}
})

//Updating the image count
app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found){
		res.status(400).json('not found')
	}	
})


app.listen(3001, () => {
	console.log('app is running on port 3001');
})


