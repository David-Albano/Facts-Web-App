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

// Selecting DOM elements
const fact_form = document.getElementById("fact-form")
const btn_share = document.getElementById("btn-share")
const fact_list = document.querySelector(".facts-list")

// Create DOM elements: Render facts in list
fact_list.innerHTML = "";

// Load data from Supabase
loadFacts()

async function loadFacts() {
    const response = await fetch('https://srehzlaytuvzzqkcpnjp.supabase.co/rest/v1/facts', {
    headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZWh6bGF5dHV2enpxa2NwbmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyNDAwODcsImV4cCI6MjAwMTgxNjA4N30.7sb-ONRnlSpM0n402crQiBl2LEDzqZ-WEna7plqmOos",
        authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZWh6bGF5dHV2enpxa2NwbmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyNDAwODcsImV4cCI6MjAwMTgxNjA4N30.7sb-ONRnlSpM0n402crQiBl2LEDzqZ-WEna7plqmOos",
        }
    })
    const data = await response.json()
    createFactList(data)
}

function createFactList(dataArray) {

    const htmlArray = dataArray.map((fact) => 
    `
    <li class="fact">
    <p>
        ${fact.text}
        <a class="source" href="${fact.source}" target="_blank">
            (Source)
        </a>
    </p>
    <span class="tag" style="background-color: 
        ${CATEGORIES.find((category) => category.name === fact.category).color}">
        ${fact.category}
    </span>
    </li>
    `
)

const html = htmlArray.join("")
fact_list.insertAdjacentHTML("afterbegin", html)
}

// Toggle from visibility
btn_share.addEventListener("click", () => {
    hide_form()
})

function hide_form() {
    if (fact_form.style.display == "flex") {
        fact_form.style.display = "none"
        btn_share.innerHTML = "Share a fact"
    } else {
        fact_form.style.display = "flex"
        btn_share.innerHTML = "Close"
    }
}

const list = [7, 64, 6, -23, 11]
const filtered_list = list.filter((element) => element > 10)
console.log(filtered_list)
const filtered_list2 = list.find((element) => element < 10)
console.log(filtered_list2)

