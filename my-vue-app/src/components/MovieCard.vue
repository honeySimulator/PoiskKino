<template>
  <div class="movie-card">
    <div v-if="expanded" class="movie-details">
      <div class="movie-row">
        <div class="left">
        <img :src="movie.poster.previewUrl" alt="Movie Poster" />
        <div class="link-to-watch">
        <button>{{ movie.rating.imdb }}<br>imdb  </button>
        <button>{{ movie.rating.kp }}<br>kinopoisk  </button>
        <button> {{ movie.rating.russianFilmCritics }}<br>РКФ  </button>
      </div>
        </div>

        <div class="link-to-watch">
          <div>
      <h2>{{ movie.name }} ({{ movie.year }})</h2>
            <span class="card-subtitle">{{ movie.alternativeName }}</span>
            <p>
              {{
                `${Math.floor(movie.movieLength / 60)}ч ${movie.movieLength % 60}мин`
              }}
            </p>
      <p style="max-width: 500px">{{ movie.description }}</p>
            <div class="link-to-watch">
              <button @click="toggleBookmark(movie.id)" class="button-fav">
                {{ isMovieBookmarked(movie.id) ? 'Удалить из избранного' : 'Добавить в избранное' }}
              </button>
            </div>
            <div>
              <div>
                <button v-for="i in 5" :key="i" @click="rateMovie(movie.id, i)" class="button-rate">
                  {{ i }}
                  <i class="bi bi-star-fill" :class="{ 'yellow-star': i <= ratingValue }"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <h1 style="align-self: start; margin-left: 30px">Смотреть:</h1>
      <div class="link-to-watch">
      <div v-for="kino in movie.watchability.items" :key="kino.name" >
      <a :href= "kino.url" class="button">
        <img :src="kino.logo.url" alt="Описание изображения">
      </a>
      </div>
      </div>

      <!--      <p v-if="isBookmarked">В закладках у пользователя</p>-->
      <router-link :to="{ name: 'Home' }">
        <button class="expand-button">Назад</button>
      </router-link>
    </div>
    <div v-else class="movie-page">
      <router-link :to="{ name: 'Movie', params: { id: movie.id } }"
                   class="card-link"
      >
      <img :src="movie.poster.previewUrl" alt="Movie Poster" />
      <div class="movie-info">
        <h2>{{ movie.name }}</h2>
        <h6 class="card-subtitle">{{ movie.year }}</h6>
        <div class="rating-length">
          <i class="bi bi-star-fill yellow-star">{{ movie.rating.imdb }}</i>
          <p>
            {{
              `${Math.floor(movie.movieLength / 60)}ч${movie.movieLength % 60}мин`
            }}
          </p>
        </div>

      </div>

      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ratingValue: null,
    };
  },
  methods: {
    isMovieBookmarked(movieId) {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        return parsedFavorites.some((movie) => movie.id === movieId);
      }
      return false;
    },
    toggleBookmark(movieId) {
      const favorites = localStorage.getItem("favorites");
      let parsedFavorites = favorites ? JSON.parse(favorites) : [];

      if (this.isMovieBookmarked(movieId)) {
        parsedFavorites = parsedFavorites.filter((movie) => movie.id !== movieId);
      } else {
        const movieToAdd = this.movie;
        parsedFavorites.push(movieToAdd);
      }

      localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
    },
    rateMovie(movieId, rating) {
      const rated = localStorage.getItem("rated");
      let parsedRated = rated ? JSON.parse(rated) : [];
  const movieToUpdate = this.movie;
  const existingRatingIndex = parsedRated.findIndex((movie) => movie.id === movieId);
  if (existingRatingIndex !== -1) {
  parsedRated[existingRatingIndex].rating = rating;
} else {
  parsedRated.push({
    id: movieId,
    poster: movieToUpdate.poster.previewUrl,
    year: movieToUpdate.year,
    name: movieToUpdate.name,
    rating: rating,
  });
}

localStorage.setItem("rated", JSON.stringify(parsedRated));
},
},
};
</script>

<style scoped>
.movie-page {
  width: 170px;
  height: 95%;
  padding: 20px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgba(26, 26, 26, 0.15); /* Здесь 0.8 - это значение прозрачности (от 0 до 1) */
  /*justify-content: space-around;*/

}
.movie-row {
  display: flex;
  flex-direction: row;
  padding: 20px;
}
.movie-details .link-to-watch {
  display: flex;
  flex-direction: row;
  /*margin: 10px;*/
}
.movie-details img {
  max-width: 300px;
  margin: 20px;

}
.link-to-watch{
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: left;
}

.link-to-watch img{
  max-width: 70px;
  margin: 10px;
}
.link-to-watch button{
  margin: 10px;
}
.button-fav{
  background-color: darkgoldenrod;
}
.button-rate{
max-width: 75px;
  /*background-color: orangered;*/
}
.movie-details {
  height: 95%;
  padding: 20px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  background-color: white; /* Здесь 0.8 - это значение прозрачности (от 0 до 1) */
  /*justify-content: space-around;*/

}
.movie-page > div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.movie-page h2 {
  padding-top: 5px;
  transition: color 0.3s;
  font-size: 1.2em;
  color: white;
}
.movie-info .rating-length {
  display: flex;
  justify-content: space-between;
}
.movie-info .rating-length i{
color: darkgoldenrod
}

.movie-page p, h6, i {
  padding: 0;
  margin: 0;
  color: white;


}
.movie-page:hover h2 {
  color: darkgoldenrod;
}

/*.movie-card button {*/
/*  !*padding: 20px;*!*/
/*  width: 200px;*/
/*  justify-content: ;*/
/*  !*margin: 10px;*!*/
/*  margin-top: auto;*/

/*}*/

.movie-page img {
  max-width: 130px;
  object-fit: cover;
  transition: filter 0.3s;

}

.movie-page:hover img {
  filter: brightness(80%);

}

.movie-card{
  margin: 20px;
}

.card-link {
  text-decoration: none;
  color: white;

}
.card-subtitle {
  color: rgba(155, 155, 155, 0.95); /* Здесь 0.8 - это значение прозрачности (от 0 до 1) */
}



</style>
