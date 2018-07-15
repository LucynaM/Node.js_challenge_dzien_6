//Twój kod

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public/zadanie01/'));
app.use(bodyParser.urlencoded());


app.post('/show/result', (req, res) => {
    const {num1, num2} = req.body; 
	if (parseInt(num1, 10) % parseInt(num2, 10) === 0) {
		res.send(`Liczba ${num1} jest dzielnikiem liczby ${num2}`);
	} else {
		res.send(`Liczba ${num1} nie jest dzielnikiem liczby ${num2}`);
	}
});

app.listen(3000, () => {
	console.log('Serwer uruchomiony na porcie 3000')
});