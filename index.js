const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const swaggerUi = require('express-oas-generator')

const xpserver = express()

/* SERVER CONFIGURATION */
xpserver.use(morgan('common')) // logging
xpserver.use(express.static('./public'))
xpserver.use(bodyParser.urlencoded({extended: false}))

swaggerUi.init(xpserver, {})

// test data
const people = [{'name': 'Luke Skywalker'}, {'name': 'Han Solo'}]

// endpoints
xpserver.get('/', (req, res) => {
    const about = {
        about: 'simple express REST service',
        author: 'Vincent Fazio',
        company: 'Blackwater Pragmatic, Inc',
    }
    res.json(about)
})

xpserver.get('/health', (req, res) => {
    const healthCheck = {
        health: 'server is running',
        time: new Date().toISOString(),
    }
    res.json(healthCheck)
})

xpserver.get('/people', (req, res) => {
    res.json(people)
})

xpserver.post('/people', (req, res) => {
    const newPerson = {'name': req.body.name}
    const newPersonUrl = '/people/' + people.length
    people.push(newPerson)
    res.status(201).header('Location', newPersonUrl).json(people)
})

xpserver.get('/people/:id', (req, res) => {
    const person = people[req.params.id]
    if (!person) {
        res.status(404).json({error: "User not found"})
    } else {
        res.json(person)
    }
})

// start the server
xpserver.listen(8080, () => {
})