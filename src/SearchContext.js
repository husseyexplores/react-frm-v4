import { createContext } from 'preact-context';

const SearchContext = createContext({
  // how the data looks like
  location: 'Seattle, Wa',
  animal: '',
  breed: '',
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
