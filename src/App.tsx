import React from 'react'
import CountrySelector from './CountrySelector'
import BBNN from './BBNN'
import './App.scss'

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <h1>Populism Alert</h1>
      </header>
      <section className="App-main"> 
        <section className="country-selector">
          <CountrySelector />
        </section>
        <section className="bbnn-wrapper">
          <BBNN />
        </section>
      </section>
      <footer className="App-footer"> 
      </footer>
    </div>
  );

}

export default App
