//Twój kod

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const options = {index: "app.html"};
app.use('/add', express.static('./public/zadanieDnia/', options));
app.use(bodyParser.urlencoded());
app.use(cookieParser());


function addComment(commentsCookieValue, newComment) {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}

function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}

app.get('/', (req, res) => {
	const messagesCookie = req.cookies.messages;
	let msg = '';
	for (message of readComments(messagesCookie)) {
		msg += message;
		msg += '<br>';
	};
	res.send(msg);
});


app.post('/save', (req, res) => {
	const {msg} = req.body;
	const messagesCookie = req.cookies.messages;
	const messages = addComment(messagesCookie, msg)
	res.cookie('messages', messages);
	res.send('<a href="/">Strona główna</a>');
});

app.listen(3000, () => {
	console.log('Serwer działa na porcie 3000');
});