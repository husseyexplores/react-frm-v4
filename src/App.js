import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import NavBar from './NavBar';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Provider store={store}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search" />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
