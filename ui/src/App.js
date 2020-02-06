import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
} from 'react-router-dom'
import { Container } from 'reactstrap'

import './App.css';

import {
  Continents,
  Countries,
  Regions,
  Country,
} from './Pages'

function App() {
  return (
    <Router>
      <Container>
        <Switch>

          <Route 
            exact 
            path="/:continent/:region/:countryCode"
            render={({ match: { params: { countryCode } } }) => (
              <Country countryCode={countryCode} />
            )}
          />

          <Route 
            exact 
            path="/:continent/:region"
            render={({ match: { params: { region } } }) => (
              <Countries region={region} />
            )}
          />

          <Route 
            exact 
            path="/:continent"
            render={({ match: { params: { continent } } }) => (
              <Regions continent={continent} />
            )}
          />

          <Route exact path="/">
            <Continents/>
          </Route>

        </Switch>
      </Container>
    </Router>
  );
}

export default App;
