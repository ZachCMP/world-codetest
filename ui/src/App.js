import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
} from 'react-router-dom'
import { Container } from 'reactstrap'

import Breadcrumbs from './Components/Breadcrumbs'
import {
  Continents,
  Countries,
  Regions,
  Country,
} from './Pages'

function App() {
  return (
    <Router>
      <Route
        path="/:continent?/:region?/:country?"
        render={({ match: { params } }) => (
          <Breadcrumbs 
            crumbs={[ 
              { display: 'Home', url: '/' },
              (params.continent ? { display: params.continent, url: `/${params.continent}` } : null),
              (params.region ? { display: params.region, url: `/${params.continent}/${params.region}` } : null),
              (params.country ? { display: params.country, url: `/${params.continent}/${params.region}/${params.country}` } : null),
            ]}
          />
        )}
      />
      
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
