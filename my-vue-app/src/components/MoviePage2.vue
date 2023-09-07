<template>
  <h1>Title</h1>
  <div>
    <h2>{{ movie.name }}</h2>
    <h3>{{ movie.year }}</h3>
    <p>{{ movie.description }}</p>
  </div>
</template>

<script>
import movies from '../data/kinopoisk-1.json';

export default {
  name: "MoviePage",
  props: {
    movieId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: null
    };
  },
  created() {
    // Загрузка данных из JSON файла
    fetch("../data/kinopoisk-1.json")
        .then(response => response.json())
        .then(data => {
          this.movie = data.docs.find(movie => movie.id === this.movieId);
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных: ", error);
        });
  }
};
</script>

<style scoped>

</style>