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
    if(this.props.debouncedMessage !== ''){
      this.getDataFilms(this.state.page, this.props.debouncedMessage);
    }
  }

  componentDidUpdate(prevState){
    if(prevState.debouncedMessage !== this.props.debouncedMessage){
      this.setState({
        elem: null,
        error: null,
        loading: true,
      });

      if(this.props.debouncedMessage === '') {
         this.setState({
          elem: null,
          error: null,
          page: 1,
          totalPages: null,
        });
        return;
    }

      this.getDataFilms(1, this.props.debouncedMessage);

    }
  }

  errSetState = ()=> this.setState({
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
        if(body.length !== 0){
          this.setState({
            elem: body,
            loading: null,
            page,
            totalPages: body[0].totalPages,
          });
        }else{
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
    this.getDataFilms(pageNum, this.props.debouncedMessage);
  };

  render() {
    const { elem, error, loading, page, totalPages } = this.state;
    const { debouncedMessage } = this.props;
    const spinner = loading && debouncedMessage !== ''? <Spinner /> : null;
    const err = error ? <Networkrror /> : null;
    const greetings = debouncedMessage === '' ? <Greetings /> : null;

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
            {greetings}
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
