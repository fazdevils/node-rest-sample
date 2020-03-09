const express = require('express')

/* IMPORT UTILS */
const morgan = require('morgan')
const bodyParser = require('body-parser')

/* IMPORT ROUTES */
const swaggerUi = require('express-oas-generator') // DO NOT USE IN PRODUCTION!!
const utilRoutes = require('./routes/util.js')
const peopleRoutes = require('./routes/people.js')

/* CREATE EXPRESS SERVER */
const xpserver = express()

/* SERVER CONFIGURATION */
swaggerUi.handleResponses(xpserver, {})

xpserver.use(morgan('common')) // logging
xpserver.use(express.static('./public'))
xpserver.use(bodyParser.urlencoded({extended: false}))
xpserver.use('/', utilRoutes)
xpserver.use('/people', peopleRoutes)

/* START THE SERVER */
swaggerUi.handleRequests()
xpserver.listen(8080, () => {
})