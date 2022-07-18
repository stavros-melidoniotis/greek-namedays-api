import express from 'express'
import path from 'path'

import { promises as fs } from 'fs'
import { calculateNamedays } from './helpers/namedays.js'
import { calculateEasterSunday, yearIsValid } from './helpers/dates.js'
import errorMessages from './errorMessages.js'

const PORT = '8080'
const __dirname = path.resolve()
const app = express()

const fixedNamedaysPath = path.join(__dirname, 'data', 'fixed_namedays.json')
const movingNamedaysPath = path.join(__dirname, 'data', 'moving_namedays.json')

app.get('/api/v1/namedays', async (req, res) => {
    try {
        const year = req.query.year ?? new Date().getFullYear()

        if (!yearIsValid(year)) {
            res.status(400)
            res.send({
                success: false,
                message: errorMessages.invalidYear(year)
            })

            return
        }

        const [fixedNamedays, movingNamedays] = await Promise.all([
            fs.readFile(fixedNamedaysPath, 'utf8'),
            fs.readFile(movingNamedaysPath, 'utf8')
        ])
        const namedays = calculateNamedays(fixedNamedays, movingNamedays, year)

        res.send({
            success: true,
            namedays: namedays
        })
    } catch (err) {
        console.error(err)

        res.status(500)
        res.send({
            success: false,
            message: errorMessages.unexpectedError
        })
    }
})

app.get('/api/v1/namedays/today', async (req, res) => {
    try {
        const today = new Date()
        const year = today.getFullYear()

        const [fixedNamedays, movingNamedays] = await Promise.all([
            fs.readFile(fixedNamedaysPath, 'utf8'),
            fs.readFile(movingNamedaysPath, 'utf8')
        ])
        const namedays = calculateNamedays(fixedNamedays, movingNamedays, year)
        const todaysNamedays = namedays[`${today.getDate()}/${today.getMonth() + 1}`]

        res.send({
            success: true,
            today: todaysNamedays
        })
    } catch (err) {
        console.error(err)

        res.status(500)
        res.send({
            success: false,
            message: errorMessages.unexpectedError
        })
    }
})

app.get('/api/v1/easter-day', (req, res) => {
    const year = req.query.year ?? new Date().getFullYear()

    if (!yearIsValid(year)) {
        res.status(400)
        res.send({
            success: false,
            message: errorMessages.invalidYear(year)
        })

        return
    }

    const easterDayTimestamp = calculateEasterSunday(year).getTime()

    res.send({
        success: true,
        easter_day: easterDayTimestamp
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