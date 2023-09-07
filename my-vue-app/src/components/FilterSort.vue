<template>
  <div class="filter-sort">
    <div class="filter">
      <label for="filterInput"></label>
      <input type="text" id="filterInput" v-model="filterValue"  class="form-control" @input="applyFilter" placeholder="Поиск фильма">

    </div>
<!--    <div class="sort">-->
<!--      <label for="sortSelect">Сортировка:</label>-->
<!--      <select id="sortSelect" v-model="sortOrder" @change="applySort">-->
<!--        <option value="asc">По возрастанию</option>-->
<!--        <option value="desc">По убыванию</option>-->
<!--      </select>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "FilterSort",
  data() {
    return {
      filterValue: "",
      sortOrder: "asc"
    };
  },
  methods: {
    applyFilter() {
      this.$emit("filter-movies", this.filterValue);
    },
    applySort() {
      this.$emit("sort-movies", this.sortKey, this.sortOrder);
    }
  }
};
</script>

<style scoped>
.filter-sort {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 260px;

}

.filter {
  margin-left: 20px;
  width: 600px;
}

.sort select {
  width: 250px;
  margin-left: 20px;

}
</style>
