import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router);

const Discovery = () => import('.././components/discovery/Discovery');
const DRecommend = () => import('.././components/d-recommend/DRecommend');
const DSongList = () => import('.././components/d-song-list/DSongList');
const DNewDisc = () => import('.././components/d-new-disc/DNewDisc');
const DSinger = () => import('.././components/d-singer/DSinger');
const DRanking = () => import('.././components/d-ranking/DRanking');
const Search = () => import('.././components/search/Search');
const SingerDetail = () => import('.././components/singer-detail/SingerDetail');
const SongListDetail = () => import('.././components/song-list-detail/SongListDetail');
const DiscDetail = () => import('.././components/disc-detail/DiscDetail');

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
                    component: DRecommend,
                    children: [
                        {
                            path: ':id',
                            component: SongListDetail
                        }
                    ]
                },
                {
                    path: '/discovery/songList',
                    component: DSongList
                },
                {
                    path: '/discovery/newDisc',
                    component: DNewDisc
                },
                {
                    path: '/discovery/singer',
                    component: DSinger,
                    children: [
                        {
                            path: ':id',
                            component: SingerDetail
                        }
                    ]
                },
                {
                    path: '/discovery/ranking',
                    component: DRanking
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
