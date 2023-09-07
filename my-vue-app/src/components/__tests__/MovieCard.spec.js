import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import MovieCard from '../MovieCard.vue';
import { createApp } from 'vue';

describe('MovieCard', () => {
    let router;

    beforeAll(() => {
        router = {
            push: jest.fn(),
            replace: jest.fn(),
            resolve: jest.fn(),
            options: {
                routes: [],
            },
        };

        const app = createApp({});
        app.use({
            install: (app) => {
                app.config.globalProperties.$router = router;
                app.config.globalProperties.$route = {
                    value: {
                        fullPath: '/',
                        path: '/',
                        query: {},
                        params: {},
                    },
                };
                app.provide('router', router);
                app.provide('route', app.config.globalProperties.$route);
            },
        });
    });

    it('correct display of movie details', () => {
        const movie = {
            id: 1,
            name: 'Test Movie',
            year: 2023,
            poster: {
                previewUrl: 'test-poster.jpg',
            },
            movieLength: 120,
            description: 'This is a test movie',
            rating: {
                imdb: 'test-imdb',
                kp: 'test-kp',
                russianFilmCritics: 'test-РКФ',
            },
            watchability: {
                items: [
                    { name: 'Source 1', url: 'source1-url', logo: { url: 'source1-logo.jpg' } },
                    { name: 'Source 2', url: 'source2-url', logo: { url: 'source2-logo.jpg' } },
                ],
            },
        };

        const wrapper = mount(MovieCard, {
            props: {
                movie: movie,
                expanded: true,
                isBookmarked: true,
            },
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true,
                },
            },
        });

        expect(wrapper.text()).toContain('Test Movie');
        expect(wrapper.text()).toContain('2023');
        expect(wrapper.text()).toContain('This is a test movie');
        expect(wrapper.text()).toContain('test-imdb');
        expect(wrapper.text()).toContain('test-kp');
        expect(wrapper.text()).toContain('test-РКФ');
        expect(wrapper.find('img').attributes('src')).toBe('test-poster.jpg');
        expect(wrapper.findAll('.button').length).toBe(2);
        expect(wrapper.findAll('.button-rate').length).toBe(5);
        expect(wrapper.findAll('.link-to-watch img').length).toBe(2);
    });
});
