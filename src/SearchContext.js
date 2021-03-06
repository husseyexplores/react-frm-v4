import React from 'react';

const SearchContext = React.createContext({
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
