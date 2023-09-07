<template>
  <div>
    <h1>Избранное</h1>
    <div class="movie-card">
    <div v-for="movie in favoriteMovies" :key="movie.id" class="movie-page">
      <router-link :to="{ name: 'Movie', params: { id: movie.id } }"
                   class="card-link"
      >
        <img :src="movie.poster.previewUrl" alt="Movie Poster" />
        <div class="movie-info">
          <h2>{{ movie.name }}</h2>
          <h6 class="card-subtitle">{{ movie.year }}</h6>
        </div>

      </router-link>
      <button @click="removeFromFavorites(movie.id)">Убрать из избранного</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Favorites",
  computed: {
    favoriteMovies() {
      const favorites = localStorage.getItem("favorites");
      return favorites ? JSON.parse(favorites) : [];
    },
  },
  methods: {
    removeFromFavorites(movieId) {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const updatedFavorites = parsedFavorites.filter(
            (movie) => movie.id !== movieId
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
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
h1{
  color: white;
  padding-top: 80px;
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

.movie-info {
  margin-bottom: 10px;

}


.link-to-watch img{
  max-width: 70px;
  margin: 10px;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card-link {
  text-decoration: none;
  color: white;

}




</style>

