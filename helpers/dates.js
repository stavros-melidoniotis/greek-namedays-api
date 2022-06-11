export const days = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
}

export const calculateEasterSunday = (year) => {
    const y1 = year % 4
    const y2 = year % 7
    const y3 = year % 19
    const k = 19 * y3 + 16
    const y4 = k % 30
    const l = 2 * y1 + 4 * y2 + 6 * y4
    const y5 = l % 7
    const n = y4 + y5 + 3

    const dateString = (n <= 30) ? `${year}/4/${n}` : `${year}/5/${n - 30}`

    return new Date(dateString)
}

const dateIsValid = (date) => {
    return date instanceof Date && !isNaN(date)
}

const dayOfWeekIsValid = (dayOfWeek) => {
    return Object.values(days).includes(dayOfWeek)
}

export const yearIsValid = (year) => {
    const START_OF_GREGORIAN_CALENDAR = 1583
    return year >= START_OF_GREGORIAN_CALENDAR
}

export const getNextOrSameDayOfWeek = (date, dayOfWeek) => {
    if (!dateIsValid(date)) {
        console.error('Invalid date provided!')
        return
    }

    if (!dayOfWeekIsValid(dayOfWeek)) {
        console.error('Invalid day of week provided!')
        return
    }

    const resultDate = new Date(date.getTime())

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)

    return resultDate
}

export const easterIsAfterReferenceDate = (easterDate, year) => {
    const referenceDate = new Date(`${year}/4/23`)

    return easterDate.getTime() > referenceDate.getTime()
}