const { request } = require("express")

let app = require("express")()

app.get('/', (request, response) => {
    response.send("Hello World")
})

app.listen(2502)