<template>
  <div>
    <MovieCard :movie="movie" :expanded="true" />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import movies from '../data/kinopoisk-1.json';

export default {
  name: "MoviePage",
  components: {
    MovieCard,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      movie: {},
    };
  },
  created() {
    console.log("Received id:", this.id);
    console.log(typeof movies.docs[0].id);

    this.movie = movies.docs.find((movie) => movie.id.toString() === this.id.toString());
    console.log("Found movie:", this.movie);

  },
};
</script>
