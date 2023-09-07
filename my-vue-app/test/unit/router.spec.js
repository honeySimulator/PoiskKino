import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import Main from '../../src/components/Main.vue';
import MoviePage from '../../src/components/MoviePage.vue';
import Rated from '../../src/components/RatedMovies.vue';
import Favorite from '../../src/components/Favorites.vue';
// import router from '../../src/router/index.js';
import movies from '../../src/data/kinopoisk-1.json';


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

describe('Route Accessibility', () => {
    it.each(routes.filter((route) => route.path !== '/movies/:id'))(
        'test %p',
        async (route) => {
            router.push(route.path);
            await router.isReady();

            const wrapper = mount(route.component);
            expect(wrapper.exists()).toBe(true);
        }
    );

    it('test path `/movies/${movieId}` ', async () => {
        const movieId = movies.docs[0].id; // Get the ID from the first movie object
        console.log(movieId);
        router.push(`/movies/${movieId}`);
        await router.isReady();

        const wrapper = mount(MoviePage, {
            props: {
                id: movieId,
            },
        });
        expect(wrapper.exists()).toBe(true);
        // Add additional assertions to test the rendered movie page
    });
});