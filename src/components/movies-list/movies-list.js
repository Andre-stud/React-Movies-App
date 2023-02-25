import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import MoviCard from '../movi-card';
import SwapiService from '../../services';
import Spinner from '../../spinner';
import Networkrror from '../../alert';
import Paginationmovieslist from '../../pagination';
import Greetings from '../../greetings';

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
    if (this.props.value !== '') {
      this.getDataFilms(this.state.page, this.props.value);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.value !== this.props.value) {
      this.setState({
        elem: null,
        error: null,
        loading: true,
      });

      if (this.props.value === '') {
        this.setState({
          elem: null,
          error: null,
          page: 1,
          totalPages: null,
        });
      }

      this.getDataFilms(1, this.props.value);
    }
  }

  errSetState = () =>
    this.setState({
      elem: null,
      error: true,
      loading: null,
    });

  errorNetwork = () => {
    this.errSetState();
  };

  getDataFilms(page, keyword) {
    this.swapi
      .getFilms(page, keyword)
      .then((body) => {
        if (body.length !== 0) {
          this.setState({
            elem: body,
            loading: null,
            page,
            totalPages: body[0].totalPages,
          });
        } else {
          this.errSetState();
        }
      })
      .catch(this.errorNetwork);
  }

  getPage = (pageNum) => {
    this.setState({
      elem: null,
      error: null,
      loading: true,
    });
    this.getDataFilms(pageNum, this.props.value);
  };

  render() {
    const { elem, error, loading, page, totalPages } = this.state;
    const { value, onChangeRated, movieData } = this.props;
    const spinner = loading && value !== '' ? <Spinner /> : null;
    const err = error ? <Networkrror /> : null;
    const greetings = value === '' ? <Greetings /> : null;

    let elements = null;

    if (!movieData && elem) {
      elements = elem.map((el, id) => (
        <li className="movie" key={el.id}>
          <MoviCard id={id} moviesData={el} onChangeRated={onChangeRated} />
        </li>
      ));
    }

    if (movieData && elem) {
      elements = elem.map((el, id) => {
        const idx = movieData.findIndex((e) => e.id === el.id);
        const oldItem = movieData[idx];
        const data = oldItem || el;
        return (
          <li className="movie" key={el.id}>
            <MoviCard id={id} moviesData={data} onChangeRated={onChangeRated} />
          </li>
        );
      });
    }

    return (
      <>
        <Online>
          <ul className="movies-list">
            {greetings}
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
