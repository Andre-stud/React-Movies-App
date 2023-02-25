import { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import GenresFilm from '../genres';

// import defaultImg from './not found.jpg';

export default class MoviCard extends Component {
  state = {
    id: this.props.moviesData.id,
  };

  onChangeRated = (ratedFilm) => {
    const rated = {
      value: ratedFilm,
    };
    this.props.onChangeRated(this.state.id, rated);
  };

  reduction(text, limit) {
    let changedText = text;
    changedText = changedText.trim();
    if (changedText.length <= limit) return changedText;

    changedText = changedText.slice(0, limit);

    return `${changedText.trim()}...`;
  }

  render() {
    const { filmName, releaseDate, description, posterPath, voteAverage, rating, genre } = this.props.moviesData;

    const releaseDateFns = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null;

    const poster = posterPath ? (
      <img className="movi-card__img" src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt="Not found" />
    ) : (
      <div className="movi-card__img not-found">?</div>
    );

    let borderStyle;

    if (voteAverage < 3) {
      borderStyle = 'movi-card-description__rating--red';
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      borderStyle = 'movi-card-description__rating--orandge';
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      borderStyle = 'movi-card-description__rating--yellow';
    }
    if (voteAverage >= 7) {
      borderStyle = 'movi-card-description__rating--green';
    }

    return (
      <div className="movi-card">
        {poster}
        <div className="movi-card-description">
          <h2 className="movi-card-description__film-name">{filmName}</h2>
          <span className={`movi-card-description__rating ${borderStyle}`}>{voteAverage}</span>
          <span className="movi-card-description__release-date">{releaseDateFns} </span>
          <div className="movi-card-description__genres">
            <GenresFilm genre={genre} />
          </div>
          <p className="movi-card-description__description">{this.reduction(description, 205)}</p>
          <Rate
            onChange={this.onChangeRated}
            style={{
              fontSize: '17px',
              position: 'absolute',
              bottom: '15px',
            }}
            allowHalf
            defaultValue={rating}
            count={10}
          />
        </div>
      </div>
    );
  }
}
