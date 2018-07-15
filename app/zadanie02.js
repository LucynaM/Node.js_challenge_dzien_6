//Twój kod

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('./public/zadanie02/'));
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Saving name from form to cookie in response
app.post('/cookie/set', (req, res) => {
	const {name} = req.body;
	res.cookie('name', name, {
        maxAge : 86400000, // one day instead of one month
    });
	res.send(`Zapisano imię ${name}`);
});

// Getting name from cookie - in request
app.get('/cookie/show', (req, res) => {
	const name = req.cookies.name;
	res.send(name);
});

// Checking if name already saved in cookie
app.get('/cookie/check', (req, res) => {
	if (req.cookies.name) {
		res.send("Imię zapisano już w ciasteczku");
	} else {
		res.send("Nie zapisano imienia w ciasteczku");
	}
});

app.listen(3000, () => {
	console.log('Serwer uruchomiony na porcie 3000')
});