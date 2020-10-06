import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BBNN from './BBNN'
import './App.scss'

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Populism Alert</h1>
          </header>
          <section className="App-main">
            <Switch>
              <Route path="/bbnn/:countryId" component={BBNN}/>
            </Switch>
          </section>
          <footer className="App-footer">
          </footer>
        </div>
      </Router>
  );

}

export default App
