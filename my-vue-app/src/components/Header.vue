<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Логотип или заголовок сайта -->
        <a class="navbar-brand" href="#">ПоискКино</a>

        <!-- Поле для ввода названия фильма -->
        <div class="input-group w-50">
          <input v-model="searchQuery" class="form-control d-none" type="text" placeholder="Поиск фильма">
        </div>

        <!-- Иконка для перехода на страницу с избранными фильмами -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/favorite" class="nav-link">
              <i class="bi bi-heart-fill"></i>

              <span class="ms-1">Избранное</span>
            </router-link>
          </li>
        </ul>

        <!-- Иконка и подпись для перехода на страницу с оцененными фильмами -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/rated" class="nav-link">
              <i class="bi bi-star-fill"></i>

              <span class="ms-1">Мои оценки</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style>
header {
  width: 100%;
}

</style>
