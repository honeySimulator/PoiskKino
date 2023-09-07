<template>
  <div class="sort">
    <div class="sidebar">
      <div class="list-group">
        <h4 class="mb-1 text-white">Сортировать по:</h4>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === '' }"
            @click="selectSort('')"
        >
          Не сортировать
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'year-asc' }"
            @click="selectSort('year-asc')"
        >
          <i :class="'fas fa-sort-down'"></i>
          По году
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'year-desc' }"
            @click="selectSort('year-desc')"
        >
          <i :class="'fas fa-sort-up'"></i>
          По году
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'rating.imdb-asc' }"
            @click="selectSort('rating.imdb-asc')"
        >
          <i :class="'fas fa-sort-down'"></i>
          По рейтингу
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'rating.imdb-desc' }"
            @click="selectSort('rating.imdb-desc')"
        >
          <i :class="'fas fa-sort-up'"></i>
          По рейтингу
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'movieLength-asc' }"
            @click="selectSort('movieLength-asc')"
        >
          <i :class="'fas fa-sort-down'"></i>
          По продолжительности
        </button>
        <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: selectedSort === 'movieLength-desc' }"
            @click="selectSort('movieLength-desc')"
        >
          <i :class="'fas fa-sort-up'"></i>
          По продолжительности
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  data() {
    return {
      selectedSort: ""
    };
  },
  methods: {
    selectSort(sortValue) {
      this.selectedSort = sortValue;
      this.$emit("sort-changed", sortValue);
    }
  }
};
</script>

<style scoped>
.sort {
  display: flex;
}

.sidebar {
  position: absolute;
  width: 200px;
  margin-left: 20px;
  margin-top: 75px;
}

.list-group-item {
  cursor: pointer;
}

.list-group h4{
padding-bottom: 20px;
}

.list-group-item {
  background-color: #242424;
  border: #fff 1px solid;
  color: #fff;
}

.list-group-item.active {
  background-color: #007bff;
  border: #fff 1px solid;

  color: #fff;
}

.list-group-item:hover {
  background-color: #242424;
  color: #fff;
  border: #007bff 5px solid;
}
</style>
