export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
  }

  async getFilms(page, keyword) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=bac8faf3324ee1807ccdc2c51e90ac7c&language=en-US&query=${keyword}&page=${page}&include_adult=false`
    );
    const moviesData = res.results.map(
      (el) =>
        (el = {
          id: el.id,
          filmName: el.title,
          releaseDate: el.release_date,
          description: el.overview,
          posterPath: el.poster_path,
          voteAverage: el.vote_average.toFixed(1),
          totalPages: res.total_pages,
          genre: el.genre_ids,
        })
    );
    return moviesData;
  }

  async guestSession() {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=bac8faf3324ee1807ccdc2c51e90ac7c'
    );
    return res;
  }

  async getGenres() {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=bac8faf3324ee1807ccdc2c51e90ac7c&language=en-US'
    );
    return res;
  }

  async postRatedFilm(guestSessionId, movieId, bodyPost) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=bac8faf3324ee1807ccdc2c51e90ac7c&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyPost),
      }
    );

    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`);
    }

    return res;
  }

  async getRatedFilm(guestSessionId) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=bac8faf3324ee1807ccdc2c51e90ac7c&language=en-US&sort_by=created_at.asc`
    );
    const moviesData = res.results.map(
      (el) =>
        (el = {
          id: el.id,
          filmName: el.title,
          releaseDate: el.release_date,
          description: el.overview,
          posterPath: el.poster_path,
          voteAverage: el.vote_average.toFixed(1),
          totalPages: res.total_pages,
          rating: el.rating,
          genre: el.genre_ids,
        })
    );
    return moviesData;
  }
}
