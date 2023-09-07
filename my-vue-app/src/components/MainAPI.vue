<template>
  <div>
    <h1>Фильмы</h1>
    <div class="sidebar">
      <Sort @sort-changed="applySort" />
    </div>
    <div class="filter-sort">
      <FilterSort @filter-movies="filterMovies" @sort-movies="sortMovies" />
    </div>

    <div class="movie-card-container">
      <div v-for="movie in displayedMovies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
    <Pagination :total-items="filteredMovies.length" :per-page="24" @page-changed="changePage" />
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";
// import movies from "../data/kinopoisk-1.json";
import FilterSort from './FilterSort.vue';
import Pagination from './Pagination.vue';
import Sort from './Sort.vue';



export default {
  name: "MainPage",
  components: {
    MovieCard,
    FilterSort,
    Sort,
    Pagination
  },
  data() {
    return {
      // movies: movies,
      movies: [],
      filteredMovies: [],
      displayedMovies: [],
      currentPage: 1,
      sortKey: "",
      sortOrder: ""

    };
  },
  created() {
    this.fetchMovies();
    this.filteredMovies = [];
    this.displayedMovies = [];  },
  methods: {
    fetchMovies() {
      fetch('/api/movies')
          .then(response => {
            if (!response.ok) {
              throw new Error('Error fetching movies');
            }
            return response.json();
          })
          .then(data => {
            this.movies = data;
            this.filteredMovies = data.docs;
            this.displayedMovies = this.filteredMovies.slice(0, 24);
          })
          .catch(error => {
            console.error('Error fetching movies:', error);
          });
    },

    filterMovies(filterValue) {
      if (filterValue) {
        this.filteredMovies = this.movies.docs.filter(movie =>
            movie.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      } else {
        this.filteredMovies = this.movies.docs;
      }
      this.changePage(1);
    },
    sortMovies(sortKey, sortOrder) {
      const compareFunction = (a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      };
      this.filteredMovies.sort(compareFunction);
      this.changePage(1);
    },
    applySort(selectedSort) {
      if (selectedSort) {
        const [key, order] = selectedSort.split("-");
        this.sortKey = key;
        this.sortOrder = order === "asc" ? 1 : -1;
        this.filteredMovies.sort(this.compareMovies);
      } else {
        this.sortKey = "";
        this.sortOrder = "";
      }
      this.changePage(1);
    },
    compareMovies(a, b) {
      const valueA = a[this.sortKey];
      const valueB = b[this.sortKey];
      if (valueA < valueB) return this.sortOrder;
      if (valueA > valueB) return -this.sortOrder;
      return 0;
    },
    changePage(page) {
      const startIndex = (page - 1) * 25;
      const endIndex = startIndex + 25;
      this.currentPage = page;
      this.displayedMovies = this.filteredMovies.slice(startIndex, endIndex);
    }
  }
};
</script>


<style>
.movie-card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 190px;
  /*align-items: flex-end;*/
}
.filter-sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: white;
}
.sidebar {
  position: absolute;
  width: 200px;
  margin-top: 50px;
}

.sidebar .sort {
  position: sticky;
  top: 0;
}
</style>