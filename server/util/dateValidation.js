
function isLeapYear(year) {
    if (year < 1582) {
        return year % 4 === 0;
    } else {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
}

function getMaxDays(year, month) {
    if (isNaN(year) || isNaN(month) || month < 0 || month > 12) {
        throw new Error("Invalid year or month");
    }

    const isLeap = isLeapYear(year);
    const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return daysInMonth[month - 1];
}

module.exports = {
    getMaxDays
};