import { Component } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import SwapiService from '../../services';
import MoviesList from '../movies-list';
import RatedList from '../rated-list';
import { SwapiServiceProvider } from '../../swapi-service-context';

export default class App extends Component {
  swapi = new SwapiService();

  state = {
    elem: null,
    inputValue: '',
    value: '',
    guestSessionId: null,
    genres: null,
    page: 1,
  };

  componentDidMount() {
    this.getGuestSession();
    this.getGenres();
  }

  getGuestRatedFilm(guestSessionId) {
    this.swapi.getRatedFilm(guestSessionId).then((body) => {
      this.setState({
        elem: body,
      });
    });
  }

  getGuestSession() {
    this.swapi.guestSession().then((body) => {
      this.setState({
        guestSessionId: body.guest_session_id,
      });
    });
  }

  getGenres() {
    this.swapi.getGenres().then((body) => {
      this.setState({
        genres: body.genres,
      });
    });
  }

  onChangePage = (value) => {
    this.setState({ page: value });
  };

  onChangeValue = (value) => {
    this.setState({ inputValue: value });
    this.searchValue(value);
  };

  onChangeRated = (id, rated) => {
    this.swapi.postRatedFilm(this.state.guestSessionId, id, rated).then(() => {
      this.getGuestRatedFilm(this.state.guestSessionId);
    });
  };

  searchValue = debounce((val) => {
    this.setState({
      value: val,
    });
  }, 400);

  render() {
    const { inputValue, value, elem, genres, page } = this.state;

    const items = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <>
            <input
              className="search"
              onChange={(e) => this.onChangeValue(e.target.value)}
              value={inputValue}
              placeholder="Type to search..."
              autoFocus
            />
            <MoviesList
              movieData={elem}
              currentPage={page}
              onChangeRated={this.onChangeRated}
              onChangePage={this.onChangePage}
              value={value}
            />
          </>
        ),
      },
      {
        key: 'Rated',
        label: 'Rated',
        children: <RatedList movieData={elem} onChangeRated={this.onChangeRated} />,
      },
    ];

    return (
      <div className="body">
        <SwapiServiceProvider value={genres}>
          <Tabs defaultActiveKey="Search" className="tabs" items={items} destroyInactiveTabPane />
        </SwapiServiceProvider>
      </div>
    );
  }
}
