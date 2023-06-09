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
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("all")

  useEffect(function() {
    async function getFacts() {
      setIsLoading(true)

      let query = supabase.from('facts').select()

      if (currentCategory !== "all") {
        query.eq("category", currentCategory)
      }

      let { data: facts, error } = await query.order('votesInteresting', {ascending: false})
      
      {!error ? setFacts(facts) : alert('There was a problem getting data')}

      setIsLoading(false)
    }

    getFacts()
  }, [currentCategory])

  return (
  // A component cannot return more than one element
  // This is called a fragment (JSX element), i won't produce eny html output, so we can return more than one element (link to component together)
  <> 
    <Header showForm={showForm} setShowForm={setShowForm} />
    
    {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/> : null}

    <main className="main">
      <CategoryFilter setCurrentCategory={setCurrentCategory} />
      
      {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
    </main>
  </>
  )
}

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-spinner"></div>
        <p className="loader-progress">{progress}%</p>
    </div>
  );
};

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
  const [source, setSource] = useState("")
  const [category, setCategory] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  async function handleSubmit(event) {
    // 1. Prevent browser reload
    event.preventDefault()
    
    // 2. Check if data is valid, If so, create a new fact
    
    if(text && isValidHttpUrl(source) && source && category && text.length <= 200) {

      //. 3 Upload fact to supabase and receive th new fact object

      setIsUploading(true)
      const {data: newFact, error} = await
        supabase
        .from("facts")
        .insert([{text, source, category}])
        .select()
      
      setIsUploading(false)

      // 4. Add the new fact to the UI : add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts])

      // 5. Re set input fields
      setText("")
      setSource("")
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
        onChange={(event) => setText(event.target.value)}
        disabled={isUploading}/>

      <span className="">{ 200 - text.length}</span>

      <input 
        type="text" 
        placeholder="Trustworthy source......"
        value={source}
        onChange={(event) => setSource(event.target.value)}
        disabled={isUploading}/>

      <select value={category} 
              onChange={(event) => setCategory(event.target.value)}
              disabled={isUploading}>
          <option value="">Change Category:</option>
            {CATEGORIES.map((category) => 
          <option key={category.name} value={category.name}>
              {category.name.toUpperCase()}
          </option>
          )}
      </select>
      <button className="btn btn-large"
              disabled={isUploading}>
          Post
      </button>
    </form>
  )
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
      <li className="category">
          <button className="btn btn-all-categories"
                  onClick={() => setCurrentCategory("all")}>
              All
          </button>
      </li>

      {CATEGORIES.map((category) => (
        <li key={category.name} className="category">
            <button className="btn btn-category" 
                    style={{ backgroundColor: category.color}} 
                    onClick={() => setCurrentCategory(category.name)}
                    >
              {category.name}
            </button>
        </li>
      ))}
      </ul>
    </aside>
  )
}

function FactList({ facts, setFacts }){
  if(facts.length === 0) {
    return (
      <div className='facts-message'>
          <div className="empty-logo">
              <img src="empty-box.png" alt="Empty facts Category"/>
          </div>
        <p className='message'>There is no facts for this category yet!</p>
        <p className='message'>Create the first one!! 🙌</p>
      </div>
    )
  }
  
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  )
}

// const {factObj} = props   // (const factObj = props.factObj)
function Fact({ fact, setFacts }) {
    const [isUpdating, setIsUpdating] = useState(false)
    const factIsDisputed = fact.votesFalse > fact.votesInteresting + fact.votesMindblowing

    async function handleVote(columnName) {
      setIsUpdating(true)
      const {data: updateFact, error} =  await supabase.from("facts")
      .update({[columnName]: fact[columnName] + 1})
      .eq("id", fact.id)
      .select()
      
      setIsUpdating(false)
    
      if(!error) 
        setFacts((facts) => 
        facts.map((f) => 
        (f.id === fact.id ? updateFact[0] : f)
      ))
    }

    return(
      <li className="fact">
        <p>
            {factIsDisputed ? <span className="disputed-fact">[⛔️ DISPUTED] </span> : null}
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
            <button 
                  onClick={() => handleVote("votesInteresting")}
                  disabled={isUpdating}
                  >
                <div className="thumb-up">👍</div>
                <div> {fact.votesInteresting}</div></button>
            <button 
                  onClick={() => handleVote("votesMindblowing")}
                  disabled={isUpdating}
                  >
                <div className="mind-blowing">🤯</div>
                <div> {fact.votesMindblowing}</div></button>
            <button 
                  onClick={() => handleVote("votesFalse")}
                  disabled={isUpdating}
                  >
                <div className="forbidden">⛔️</div>
                <div> {fact.votesFalse}</div></button>
        </div>
      </li>
    )
}

export default App