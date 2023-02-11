import { Component } from 'react';

import MoviesList from '../movies-list';
import Tabsitem from '../../tabs';

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <Tabsitem />
        <input className="search" placeholder="Type to search..." autoFocus />
        <MoviesList />
      </div>
    );
  }
}
