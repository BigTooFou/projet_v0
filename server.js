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
	"hostname": "covid-19-data.p.rapidapi.com",
	"port": null,
	"path": "/totals",
	"headers": {
		"x-rapidapi-key": "1632b11b8amsh5d892a7d1c73fdep19210djsn35cac2f2fa82",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"useQueryString": true
	}
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