const express = require('express')

const router = express.Router()

// endpoints
router.get('/about', (req, res) => {
    const about = {
        about: 'simple node.js express REST service',
        author: 'Vincent Fazio',
        company: 'Blackwater Pragmatic, Inc',
    }
    res.json(about)
})

router.get('/health', (req, res) => {
    const healthCheck = {
        health: 'server is running',
        time: new Date().toISOString(),
    }
    res.json(healthCheck)
})

module.exports = router