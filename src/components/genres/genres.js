import { SwapiServiceConsumer } from '../../swapi-service-context';

function GenresFilm({ genre }) {
  return (
    <SwapiServiceConsumer>
      {(genres) =>
        genre.map((el) => {
          const idx = genres.findIndex((e) => el === e.id);
          const item = genres[idx];
          return (
            <span className="movi-card-description__genre" key={el}>
              {item.name}
            </span>
          );
        })
      }
    </SwapiServiceConsumer>
  );
}

export default GenresFilm;
