import { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

export default class MoviCard extends Component {
  reduction(text, limit) {
    let changedText = text;
    changedText = changedText.trim();
    if (changedText.length <= limit) return changedText;

    changedText = changedText.slice(0, limit);

    return `${changedText.trim()  }...`;
  }

  render() {
    const { rating, filmName, releaseDate, description, posterPath, voteAverage } = this.props.moviesData;
    const releaseDateFns = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null;
    // const releaseDateFns = format(new Date(releaseDate), 'MMMM dd, yyyy');
    
    return (
      <div className="movi-card">
        <img className="movi-card__img" src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt="Not found" />
        <div className="movi-card-description">
          <h2 className="movi-card-description__film-name">{filmName}</h2>
          <span className="movi-card-description__rating">{rating}</span>
          <span className="movi-card-description__release-date">{releaseDateFns} </span>
          <div>
            <button type='button'>Action</button>
            <button type='button'>Drama</button>
          </div>
          <p className="movi-card-description__description">{this.reduction(description, 120)}</p>
          <Rate
            style={{
              fontSize: '17px',
              position: 'absolute',
              bottom: '15px',
            }}
            allowHalf
            defaultValue={voteAverage}
            count={10}
          />
        </div>
      </div>
    );
  }
}
