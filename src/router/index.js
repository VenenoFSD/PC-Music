import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router);

const Discovery = () => import('.././components/discovery/Discovery');
const Search = () => import('.././components/search/Search');
const DRecommend = () => import('.././components/d-recommend/DRecommend');
const DSongList = () => import('.././components/d-song-list/DSongList');
const DNewSong = () => import('.././components/d-new-song/DNewSong');
const SongList = () => import('.././base/song-list/SongList');

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
                    path: '/discovery/newSong',
                    component: DNewSong
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
