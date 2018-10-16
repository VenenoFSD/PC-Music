import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router);

const Discovery = () => import('.././components/discovery/Discovery');
const DRecommend = () => import('.././components/d-recommend/DRecommend');
const DSongList = () => import('.././components/d-song-list/DSongList');
const SongList = () => import('.././base/song-list/SongList');
const DNewDisc = () => import('.././components/d-new-disc/DNewDisc');
const DSinger = () => import('.././components/d-singer/DSinger');
const Search = () => import('.././components/search/Search');

const defaultSongList = store.state.songListTags || '';

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/discovery'
        },
        {
            path: '/discovery',
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
                    path: '/discovery/songList',
                    component: DSongList,
                    children: [
                        {
                            path: ':id',
                            component: SongList
                        }
                    ]
                },
                {
                    path: '/discovery/newDisc',
                    component: DNewDisc
                },
                {
                    path: '/discovery/singer',
                    component: DSinger
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
