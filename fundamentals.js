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

const [text, createdIn, isTrue] = fact

console.log(text)
console.log(createdIn)
console.log(isTrue)

// Unpacking arrays with ...array
const newFact = [...fact, "Society"]
console.log(newFact)
const newFact2 = ["Society", ...fact]
console.log(newFact2)

// Objects

const factObj = {
    text: "Lisbon is the capital of Portugal",
    category: "Society",
    createdIn: 2015,
    isCorrect: true,
    createSummary: function(){
        return `The fact ${this.text} is from the category of ${this.category.toUpperCase()}`
    }
}

// console.log(factObj.text)
// console.log(factObj.category)
// console.log(factObj.createdIn)
// console.log(factObj.isCorrect)

const {category, isCorrect, createSummary} = factObj

// console.log(category)
// console.log(isCorrect)
// console.log(factObj.createSummary())


// For each

// const list = [2, 4, 6, 8, 0]
// list.forEach(function(elemnt) {
//     console.log(elemnt)
// })

// const newList = list.map(function(elemnt){
//     return elemnt * 10
// })

// console.log(newList)

// Same function aboce but as ARROW FUNCTION

// const newList = list.map((element) => element * 10)
// console.log(newList)


const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];

const allCategoriesNames = CATEGORIES.map((category) => category.name.toUpperCase())
console.log(allCategoriesNames)


const initialFacts = [
    {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
    },
    {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
    "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
    },
    {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
    },
];

const today = new Date().getFullYear()
const factAges = initialFacts.map((fact) => today - fact.createdIn)
console.log(factAges)
// console.log(factAges.join("~"))