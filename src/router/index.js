import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Discovery = () => import('.././components/discovery/Discovery');
const Search = () => import('.././components/search/Search');
const DRecommend = () => import('.././components/d-recommend/DRecommend');
const DPlaylist = () => import('.././components/d-playlist/DPlaylist');

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/discovery/recommend'
        },
        {
            path: '/discovery',
            component: Discovery,
            children: [
                {
                    path: '/discovery/recommend',
                    component: DRecommend
                },
                {
                    path: '/discovery/playlist',
                    component: DPlaylist
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
