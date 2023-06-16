import './style.css'

function App() {
  const appTitle = "Today I Learned"

  return (
  // A component cannot return more than one element
  // This is called a fragment (JSX element), i won't produce eny html output, so we can return more than one element (link to component together)
  <> 
    {/* HEADER */}
    <header className="header">
        <div className="logo">
            <img src="logo.png" alt="Today I Learned Logo"/>
            <h1>{appTitle}</h1>
        </div>

        <button id="btn-share" className="btn btn-large">
            Share a fact
        </button>
    </header>

    <NewFactForm />

    <main className="main">
      <CategoryFilter />
      <FactList />
    </main>
  </>
  )
}

function NewFactForm(){
  return <form className="fact-form">Fact form</form>
}

function CategoryFilter() {
  return <aside>Category Filter</aside>
}

function FactList(){
  return <section>Fact List</section>
}

export default App