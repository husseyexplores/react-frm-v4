import React from 'react';
import { connect } from 'react-redux';
import pf from 'petfinder-client';
import Pet from './Pet';
import { Consumer } from './SearchContext';
import SearchBox from './SearchBox';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    const { location, animal, breed } = this.props.searchParams;
    petfinder.pet
      .find({ location: location, animal, breed, output: 'full' })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({
          pets: pets
        });
      });
  };

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ');
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              id={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContextProps(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}

// const mapStateToProps = ({ location }) => ({
//   location
// });
// export default connect(mapStateToProps)(ResultsWithContextProps);