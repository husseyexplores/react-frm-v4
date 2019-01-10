import React from 'react';
import pf, { Pet as PetType } from 'petfinder-client';
import { RouteComponentProps, navigate } from '@reach/router';
import Pet from './Pet';
import { Consumer } from './SearchContext';
import SearchBox from './SearchBox';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('No API Key is defined');
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface Props {
  searchParams: {
    location: string,
    animal: string,
    breed: string,
  }
}

interface State {
  pets: PetType[]
}

class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  public componentDidMount() {
    this.search();
  }

  public search = () => {
    const { location, animal, breed } = this.props.searchParams;
    petfinder.pet
      .find({ location: location, animal, breed, output: 'full' })
      .then(data => {
        let pets: PetType[];

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({ pets });
      })
      .catch(() => navigate('/'));
  };

  public render() {
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

export default function ResultsWithContextProps(props: RouteComponentProps) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
