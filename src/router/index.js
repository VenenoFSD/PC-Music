import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Discovery = () => import('.././components/discovery/Discovery');
const Search = () => import('.././components/search/Search');

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/discovery'
        },
        {
            path: '/discovery',
            component: Discovery
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
