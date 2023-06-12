year = 2023

const msg = `We are in the year ${year}`
console.log(msg)

// Arrow Functions

    // function name         arguments                     return
const calculateYear = (year) => new Date().getFullYear() - year

console.log(calculateYear(1997))
console.log(calculateYear(2013))
console.log(calculateYear(2007))


// Arrays

const fact = ["Lisbon is the capital of Portugal", 2015, true]
console.log(fact)
console.log(fact[0])
console.log(fact[1])
console.log(fact[2])
console.log(fact.length)

const [text, createdIn, isCorrect] = fact

console.log(text)
console.log(createdIn)
console.log(isCorrect)

// Unpacking arrays with ...array
const newFact = [...fact, "Society"]
console.log(newFact)
const newFact2 = ["Society", ...fact]
console.log(newFact2)
