import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

interface Props {
  search: () => void,
}

class SearchBox extends React.Component<Props> {
  public handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.search();
  };

  public render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  value={context.location}
                  placeholder="Enter location..."
                  onChange={context.handleLocationChange}
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  placeholder="Enter Animal..."
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
                Breed
                <select
                  id="breed"
                  value={context.breed}
                  placeholder="Enter Breed..."
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  disabled={!context.breeds.length}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
                <button>Submit</button>
              </label>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
