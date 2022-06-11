const errorMessages = {
    invalidYear: (year) => {
        return `Year must be >= 1583. You entered "${year}".`
    },
    unexpectedError: "Unexpected error occured."
}

export default errorMessages