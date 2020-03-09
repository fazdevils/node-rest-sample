const express = require('express')

const router = express.Router()

// seed data
const people = [{'name': 'Luke Skywalker'}, {'name': 'Han Solo'}]

// endpoints
router.get('/', (req, res) => {
    res.json(people)
})

router.post('/', (req, res) => {
    const newPerson = {'name': req.body.name}
    const newPersonUrl = '/people/' + people.length
    people.push(newPerson)
    res.status(201).header('Location', newPersonUrl).json(people)
})

router.get('/:id', (req, res) => {
    const person = people[req.params.id]
    if (!person) {
        res.status(404).json({error: "User not found"})
    } else {
        res.json(person)
    }
})

module.exports = router