import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import MoviCard from '../movi-card';
import SwapiService from '../../services';
import Spinner from '../../spinner';
import Networkrror from '../../alert';
import Paginationmovieslist from '../../pagination';

export default class MoviesList extends Component {
  swapi = new SwapiService();

  state = {
    elem: null,
    error: null,
    loading: true,
    page: 1,
    totalPages: null,
  };

  componentDidMount() {
    this.getDataFilms();
  }

  errorNetwork = () => {
    this.setState({
      error: true,
      loading: null,
    });
  };

  getDataFilms(page = 1) {
    this.swapi
      .getFilms(page)
      .then((body) => {
        this.setState({
          elem: body,
          loading: null,
          page,
          totalPages: body[0].totalPages,
        });
      })
      .catch(this.errorNetwork);
  }

  getPage = (pageNum) => {
    this.setState({
      elem: null,
      error: null,
      loading: true,
    });
    this.getDataFilms(pageNum);
  };

  render() {
    const { elem, error, loading, page, totalPages } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const err = error ? <Networkrror /> : null;

    const elements = elem
      ? elem.map((el, id) => (
            <li className="movie" key={el.id}>
              <MoviCard id={id} moviesData={el} />
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
        <Paginationmovieslist setPage={this.getPage} pageNum={page} totalPages={totalPages}/>
      </>
    );
  }
}
