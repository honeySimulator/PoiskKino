import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';
import MoviePage from '../components/MoviePage.vue';
import Rated from '../components/RatedMovies.vue';
import Favorite from '../components/Favorites.vue';
import { mount } from '@vue/test-utils';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main,
    },
    {
        path: '/movies/:id',
        name: 'Movie',
        component: MoviePage,
        props: true,
    },
    {
        path: '/favorite',
        name: 'Favorite',
        component: Favorite,
    },
    {
        path: '/rated',
        name: 'Rated',
        component: Rated,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
