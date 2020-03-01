//This is a function that will sum all the elements in an array
const total = function sum(array) {
    array.reduce(function (timeA, timeB) {
        return timeA + timeB;
    }, 0);
};

module.exports = total;