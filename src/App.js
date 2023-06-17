import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css'

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

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <span style={{ fontSize: '40px'}}>{count}</span>
      <button className="btn btn-large" onClick={
        () => setCount(count + 1)
        }>
          +1
      </button>
    </div>
  )
}
function App() {
  // 1. Define state variable 
  const [showForm, setShowForm] = useState(false)
  const [facts, setFacts] = useState([])

  useEffect(function() {
    async function getFacts() {
      let { data: facts, error } = await supabase
      .from('facts')
      .select() // Could be also .select("*") to select ALL
      setFacts(facts)
    }

    getFacts()
  }, [])

  return (
  // A component cannot return more than one element
  // This is called a fragment (JSX element), i won't produce eny html output, so we can return more than one element (link to component together)
  <> 
    <Header showForm={showForm} setShowForm={setShowForm} />
    
    {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/> : null}

    <main className="main">
      <CategoryFilter />
      <FactList facts={facts} />
    </main>
  </>
  )
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned"

  return (
    <header className="header">
      <div className="logo">
          <img src="logo.png" alt="Today I Learned Logo"/>
          <h1>{appTitle}</h1>
      </div>

      <button id="btn-share" className="btn btn-large" onClick={
        () => setShowForm((show) => ! show) /* 3. Update state variable */
      }>
          {/* 2. Use state variable */}
          {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  )
}

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

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({setFacts, setShowForm}){
  const [text, setText] = useState("")
  const [source, setSource] = useState("https://example.com")
  const [category, setCategory] = useState("")

  function handleSubmit(event) {
    // 1. Prevent browser reload
    event.preventDefault()
    console.log(text, source, category)
    
    // 2. Check if data is valid, If so, create a new fact
    
    if(text && isValidHttpUrl(source) && source && category && text.length <= 200) {
      // 3. Create a new fact
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: 2023,
      }
      
      // 4. Add the new fact to the UI : add the fact to state
      setFacts((facts) => [newFact, ...facts])

      // 5. Re set input fields
      setText("")
      // setSource("")
      setCategory("")

      // 6. Close the form
      setShowForm(false)
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Share a fact with the world..." 
        value={text}
        onChange={(event) => setText(event.target.value)}/>

      <span className="">{ 200 - text.length}</span>

      <input 
        type="text" 
        placeholder="Trustworthy source......"
        value={source}
        onChange={(event) => setSource(event.target.value)}/>

      <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Change Category:</option>
            {CATEGORIES.map((category) => 
          <option key={category.name} value={category.name}>
              {category.name.toUpperCase()}
          </option>
          )}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  )
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
      <li className="category">
          <button className="btn btn-all-categories">All</button>
      </li>

      {CATEGORIES.map((category) => (
        <li key={category.name} className="category">
            <button className="btn btn-category" style={{ backgroundColor: category.color}}>
              {category.name}
            </button>
        </li>
      ))}
      </ul>
    </aside>
  )
}

function FactList({ facts }){

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  )
}

// const {factObj} = props   // (const factObj = props.factObj)
function Fact({ fact }) {
    return(
      <li className="fact">
        <p>
            { fact.text }
            <a className="source"
                href={fact.source} 
                target="_blank">
                (Source)
            </a>
        </p>
        {/* Is needed JavaScript    {{   property    :   value }} */}
        <span className="tag" style=
            {{ backgroundColor: CATEGORIES.find(
                (category) =>
                category.name === fact.category).color
            }}>
            {fact.category}
        </span>
        <div className="vote-buttons">
            <button>
                <div className="thumb-up">👍</div>
                <div> {fact.votesIntersting}</div></button>
            <button>
                <div className="mind-blowing">🤯</div>
                <div> {fact.votesMindblowing}</div></button>
            <button>
                <div className="forbidden">⛔️</div>
                <div> {fact.votesFalse}</div></button>
        </div>
      </li>
    )
}

export default App