import React from 'preact-compat';
import ReactDOM from 'preact-compat';
import { Router } from 'preact-router';
import pf from 'petfinder-client';
import { Provider } from './SearchContext';

import NavBar from './NavBar';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Seattle, Wa',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = ({ target: value }) => {
    this.setState({
      location: value.value
    });
  };

  handleAnimalChange = ({ target: value }) => {
    this.setState(
      {
        animal: value.value,
        breed: ''
      },
      this.getBreeds
    );
  };

  handleBreedChange = ({ target: value }) => {
    this.setState({
      breed: value.value
    });
  };

  getBreeds = () => {
    if (this.state.animal) {
      petfinder.breed
        .list({
          animal: this.state.animal
        })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({ breeds: data.petfinder.breeds.breed });
          } else {
            this.setState({
              breeds: []
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.setState({
        breeds: []
      });
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
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
