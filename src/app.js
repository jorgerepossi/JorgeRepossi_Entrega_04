const express = require('express')
const path = require('path')
class Server {
    constructor() {
        this.app = express();
        this.port = 8080
        this.appRouter = require('./routes/index.js')
        this.productsRouter = require('./routes/products.js')
        this.routes();
       
    }

    routes() {
        this.app.use(express.static(path.join(__dirname, '../public')))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use(express.static('public'))

        this.app.use('/', this.appRouter)
        this.app.use('/api/productos', this.productsRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

module.exports = Server