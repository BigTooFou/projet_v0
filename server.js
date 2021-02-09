let express = require('express')
let app = express()

app.set('view engine', 'ejs')

app.use('/assets',express.static('public'))

app.get('/', (request, response) => {
    response.render('pages/index', {test: 'Damienne'})
})

let request = require('request')

request({

    uri: "http://google.com",

}, function(error,response,body){

    console.log(body)

})


app.listen(2502)




/*

*/