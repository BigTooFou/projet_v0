let express = require('express')
let app = express()

app.set('view engine', 'ejs')

app.use('/assets',express.static('public'))

app.get('/', (request, response) => {
    response.render('pages/index', {test: 'Damienne'})
})

const http = require("https");

const options = {
	"method": "GET",
	"host": "google.com",
	"port": null,

};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();


app.listen(2502)




/*

*/