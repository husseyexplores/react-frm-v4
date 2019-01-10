import React from 'preact-compat';
import SearchBox from './SearchBox';
import { route } from 'preact-router';

class SearchParams extends React.Component {
  handleSearchSubmit = () => {
    route('/');
  };

  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default SearchParams;
