import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import 'bootstrap/dist/css/bootstrap.min.css'

import config from './config'

import './index.css';
import AppComponent from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: config.GQL_URL
})

const App = () => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
