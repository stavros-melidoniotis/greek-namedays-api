import {
    days,
    calculateEasterSunday,
    getNextOrSameDayOfWeek,
    easterIsAfterReferenceDate
} from "./dates.js"

export const calculateNamedays = (fixedNamedays, movingNamedays, year) => {
    const easterDate = calculateEasterSunday(year)
    const fixedNamedaysJSON = JSON.parse(fixedNamedays)
    const movingNamedaysJSON = JSON.parse(movingNamedays)
    const namedays = { ...fixedNamedaysJSON }

    for (const movingNameday of movingNamedaysJSON.namedays) {
        const names = movingNameday.names
        const dependency = movingNameday.celebration.dependency
        let celebrationDate, index

        switch (dependency) {
            case 'special_1':
                const firstSpecialDate = new Date(`${year}/02/13`)
                celebrationDate = getNextOrSameDayOfWeek(firstSpecialDate, days.SUNDAY)
                index = `${celebrationDate.getDate()}/${celebrationDate.getMonth() + 1}`

                namedays[index]['names'].push(...names)
                break
            case 'special_2':
                const secondSpecialDate = new Date(`${year}/12/11`)
                celebrationDate = getNextOrSameDayOfWeek(secondSpecialDate, days.SUNDAY)
                index = `${celebrationDate.getDate()}/${celebrationDate.getMonth() + 1}`

                namedays[index]['names'].push(...names)
                break
            case 'easter_special':
                const normalCelebration = movingNameday.celebration.normal_date
                const [normalCelebrationDay, normalCelebrationMonth] = normalCelebration.split('/')
                celebrationDate = new Date(`${year}/${normalCelebrationMonth}/${normalCelebrationDay}`)

                if (easterIsAfterReferenceDate(easterDate, year)) {
                    const daysToMove = movingNameday.celebration.moved_date

                    celebrationDate.setDate(easterDate.getDate() + daysToMove)
                }

                index = `${celebrationDate.getDate()}/${celebrationDate.getMonth() + 1}`
                namedays[index]['names'].push(...names)
                break
            case 'easter':
                const MILLISECONDS_IN_A_DAY = 86_400_000
                const daysToMove = movingNameday.celebration.moved_date
                const daysToMoveInMilliseconds = daysToMove * MILLISECONDS_IN_A_DAY

                celebrationDate = new Date(easterDate.getTime() + daysToMoveInMilliseconds)
                index = `${celebrationDate.getDate()}/${celebrationDate.getMonth() + 1}`
                namedays[index]['names'].push(...names)
                break
        }
    }

    return namedays
}