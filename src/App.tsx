import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BBNN from './BBNN'
import BBNNPage from './BBNNPage'
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
              <Route path="/bbnn" component={BBNNPage}/>
              <Route path="/" component={BBNNPage}/>
            </Switch>
          </section>
          <footer className="App-footer">
          </footer>
        </div>
      </Router>
  );

}

export default App
