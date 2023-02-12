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
    const moviesData = res.results.map((el) => (
      el = {
        id: el.id,
        rating: (el.popularity / 10).toFixed(1),
        filmName: el.title,
        releaseDate: el.release_date,
        description: el.overview,
        posterPath: el.poster_path,
        voteAverage: el.vote_average,
        totalPages: res.total_pages,
      }));
    return moviesData;
  }
}
