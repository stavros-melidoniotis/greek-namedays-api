export const calculateEasterSunday = (year = new Date().getFullYear()) => {
    const y1 = year % 4
    const y2 = year % 7
    const y3 = year % 19
    const k = 19 * y3 + 16
    const y4 = k % 30
    const l = 2 * y1 + 4 * y2 + 6 * y4
    const y5 = l % 7
    const n = y4 + y5 + 3

    const dateString = (n <= 30) ? `${year}/4/${n}` : `${year}/5/${n - 30}`

    console.log(dateString);

    return new Date(dateString).getTime()
}