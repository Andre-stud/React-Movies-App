import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import MoviCard from '../movi-card';
import Spinner from '../../spinner';
import Networkrror from '../../alert';
import Paginationmovieslist from '../../pagination';

export default class RatedList extends Component {
  state = {
    error: null,
    loading: false,
    page: 1,
    totalPages: null,
  };

  render() {
    const { error, loading, page, totalPages } = this.state;
    const { debouncedMessage, onChangeRated, movieData } = this.props;
    const spinner = loading && debouncedMessage !== '' ? <Spinner /> : null;
    const err = error ? <Networkrror /> : null;

    const elements = movieData
      ? movieData.map((el, id) => (
          <li className="movie" key={el.id}>
            <MoviCard id={id} moviesData={el} onChangeRated={onChangeRated} />
          </li>
        ))
      : null;
    return (
      <>
        <Online>
          <ul className="movies-list">
            {spinner}
            {elements}
            {err}
          </ul>
        </Online>
        <Offline>
          <Networkrror />
        </Offline>
        <Paginationmovieslist setPage={this.getPage} pageNum={page} totalPages={totalPages} />
      </>
    );
  }
}
