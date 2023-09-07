<template>
  <nav>
    <ul class="pagination">
      <li v-for="page in totalPages" :key="page" :class="{ active: page === activePage }">
        <a @click="changePage(page)" class="page-link">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  computed: {
    activePage() {
      return this.currentPage;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    }
  },
  methods: {
    changePage(page) {
      if (page < 1) {
        page = 1;
      } else if (page > this.totalPages) {
        page = this.totalPages;
      }
      this.$emit("page-changed", page);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination li:hover > a {
  background-color: #242424;
  color: #fff;
}

.pagination li {
  display: inline-block;
  margin: 0 5px;
  cursor: none;
}
/*#first{*/
/*  background-color: red;*/
/*}*/
/*.pagination li.disabled {*/
/*  pointer-events: none;*/
/*  opacity: 0.5;*/
/*}*/

/*.pagination li a {*/
/*  display: inline-block;*/
/*  padding: 5px 10px;*/
/*}*/

/*.pagination li.active a {*/
/*  background-color: #007bff;*/
/*  color: #fff;*/
/*}*/


</style>