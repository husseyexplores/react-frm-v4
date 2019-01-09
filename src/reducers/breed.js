export default function breedReducer(state = '', action) {
  switch (action.type) {
    case 'SET_BREED':
      return action.payload;

    case 'SET_ANIMAL':
      return '';

    default:
      return state;
  }
  /*
  if (action.type === 'SET_BREED') {
    return action.payload;
  }

  if (action.type === 'SET_ANIMAL') {
    return '';
  }

  return state;
  */
}
