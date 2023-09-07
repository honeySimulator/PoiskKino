<script>
import movies from '../data/kinopoisk-1.json';

console.log(movies);
export default {
  name: "Main",
  data() {
    return {
      movies: movies,
      sortKey: '', // ключ сортировки
      sortOrder: '', // порядок сортировки (1 - возрастание, -1 - убывание)
      originalOrder: movies.docs.slice()

    };
  },
  methods: {
    sortBy(sortKey) {
      if (this.sortKey === sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = sortKey;
        this.sortOrder = 'asc';
      }

      this.movies.docs.sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },
    sortByRating() {
      this.movies.docs.sort((a, b) => {
        const ratingA = a.rating ? a.rating.imdb : 0;
        const ratingB = b.rating ? b.rating.imdb : 0;
        if (ratingA < ratingB) return -1;
        if (ratingA > ratingB) return 1;
        return 0;
      });
    },
    resetSort() {
      // Сбросить сортировку
      this.sortKey = '';
      this.sortOrder = '';
      this.movies.docs = this.originalOrder.slice();
    }
  }
};
</script>

<template>

  <div>
    <!--    <Menu />-->
    <h1>Movies</h1>
  </div>
  <div class="sidebar">
    <ul class="list-group">
      <h3 class="mb-1">Сортировать по:</h3>

      <li class="list-group-item list-group-item-action" @click="sortBy('year')">Году
        <span v-if="sortKey === 'year'">
            <i :class="sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
          </span>
      </li>

      <li class="list-group-item list-group-item-action" @click="sortByRating()">Оценка
        <span v-if="sortKey === 'rating'">
            <i :class="sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
          </span>
      </li>

      <li class="list-group-item list-group-item-action" @click="sortBy('movieLength')">Продолжительность
        <span v-if="sortKey === 'movieLength'">
            <i :class="sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
          </span>
      </li>

      <li class="list-group-item list-group-item-action" @click="resetSort()">Сбросить сортировку</li>
    </ul>
  </div>
  <div class="content">
    <b-card-group class="card-deck">
      <b-card v-for="movie in movies.docs" :key="movie.id" >
        <div class="card">
          <img :src="movie.poster.previewUrl" class="card-img-top" alt="1">
          <h5 class="card-title">{{ movie.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ movie.year }}</h6>
          <i class="bi bi-star-fill yellow-star">  {{ movie.rating.imdb }}</i>

          <p class="card-text">{{ movie.shortDescription }}</p>
          <p>{{movie.movieLength}} минут</p>
          <router-link :to="{ name: 'MoviePage', params: { movieId: movie.id } }" class="card-link">
            Смотреть <h5>{{ movie.name }}</h5>
          </router-link>
        </div>
      </b-card>
    </b-card-group>
    <ul>
      <li v-for="movie in movies.docs" :key="movie.externalId.tmdb">
        {{ movie.url }}
        {{ movie.externalId.imdb }}
      </li>
    </ul>
  </div>
  <!--        <ul>-->
  <!--    <b-card-group columns class="card-group">-->

  <!--&lt;!&ndash;      <div v-for="docs in movies" :key="movie.id"  class="card">&ndash;&gt;-->
  <!--        <b-card v-for="movie in movies.docs" :key="movie.id"  class="card">-->
  <!--          <div class="card">-->
  <!--            <img :src="movie.poster.previewUrl" class="card-img-top" alt="1">-->
  <!--            <h5 class="card-title">{{ movie.name }}</h5>-->
  <!--            <h6 class="card-subtitle mb-2 text-muted">{{ movie.year }}</h6>-->
  <!--            &lt;!&ndash;          </template>&ndash;&gt;-->
  <!--            &lt;!&ndash;          <template #default>&ndash;&gt;-->
  <!--            <p class="card-text">{{ movie.shortDescription }}</p>-->
  <!--            &lt;!&ndash;          </template>&ndash;&gt;-->
  <!--            &lt;!&ndash;          <template #footer>&ndash;&gt;-->
  <!--            <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">-->
  <!--              <h2>-->
  <!--                {{ movie.name }}-->
  <!--              </h2>-->
  <!--            </router-link>-->
  <!--          </div>-->
  <!--        </b-card>-->
  <!--&lt;!&ndash;      </div>&ndash;&gt;-->
  <!--    </b-card-group>-->
  <!--          <li v-for="movie in movies.docs" :key="movie.externalId.tmdb">-->
  <!--            {{ movie.url }}-->
  <!--            {{movie.externalId.imdb}}-->
  <!--          </li>-->
  <!--        </ul>-->
</template>


<style scoped>
.card-deck {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 100%;
  /*background-color: #535bf2;*/
  /*gap: 10px;*/
  justify-content: space-around;
  align-items: center;
  /*padding: 5px;*/
  /*border: 1px solid #1a1a1a ;*/
  gap: 5px; /* Расстояние между карточками, можно настроить по своему вкусу */
}

.sidebar {
  width: 200px;
  background-color: #f2f2f2;
  /*padding: 10px;*/
  position: fixed;
}

/*.content {*/
/*  margin-left: 220px;*/
/*  !*margin: 0;*!*/
/*}*/

.card {
  flex: 1 1 50px; /* Размер карточки, можно настроить по своему вкусу */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 200px;
  padding: 5px;
  /*  border: 5px solid #1a1a1a ;*/
}
.card-img-top{
  /*width: 100px;*/
}

.yellow-star {
  color: darkgoldenrod;
}
</style>