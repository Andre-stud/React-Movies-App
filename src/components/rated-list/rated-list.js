import { Component } from 'react';

import MoviCard from '../movi-card';
import Paginationmovieslist from '../../pagination';

export default class RatedList extends Component {
  state = {
    page: 1,
    totalPages: null,
  };

  render() {
    const { page, totalPages } = this.state;
    const { onChangeRated, movieData } = this.props;

    const elements = movieData
      ? movieData.map((el, id) => (
          <li className="movie" key={el.id}>
            <MoviCard id={id} moviesData={el} onChangeRated={onChangeRated} />
          </li>
        ))
      : null;
    return (
      <>
        <ul className="movies-list">{elements}</ul>
        <Paginationmovieslist setPage={this.getPage} pageNum={page} totalPages={totalPages} />
      </>
    );
  }
}
