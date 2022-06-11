import 'dotenv/config'

import express from 'express'
import path from 'path'

import { promises as fs } from 'fs'
import { calculateEasterSunday } from './helpers.js'

const PORT = process.env.PORT || '8080'
const __dirname = path.resolve()
const app = express()

const fixedNamedaysPath = path.join(__dirname, 'data', 'fixed_namedays.json')
const movingNamedaysPath = path.join(__dirname, 'data', 'moving_namedays.json')

app.get('/api/v1/namedays/fixed', async (req, res) => {
    try {
        const data = await fs.readFile(fixedNamedaysPath, 'utf8')

        res.status(200)
        res.send({
            success: true,
            namedays: JSON.parse(data)
        })
    } catch (err) {
        console.error(err)

        res.status(500)
        res.send({
            success: false,
            message: "Unexpected error occured."
        })
    }
})

app.get('/api/v1/easter-day', (req, res) => {
    const year = req.query.year
    const easterDay = calculateEasterSunday(year)

    res.send({
        success: true,
        easter_day: easterDay
    })
})

app.get('/api/v1/*', async (req, res) => {
    res.status(404)
    res.send({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})