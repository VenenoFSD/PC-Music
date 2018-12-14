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
const RecommendSong = () => import('.././components/recommend-song/RecommendSong');
const UserFavorite = () => import('.././components/user-favorite/UserFavorite');
const MyCollection = () => import('.././components/my-collection/MyCollection');
const MyCloud = () => import('.././components/my-cloud/MyCloud');
const RecentPlay = () => import('.././components/recent-play/RecentPlay');
const Login = () => import('.././components/login/Login');
const UserDetail = () => import('.././components/user-detail/UserDetail');

export default new Router({
    routes: [
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
                    component: DSongList,
                    children: [
                        {
                            path: ':id',
                            component: SongListDetail
                        }
                    ]
                },
                {
                    path: '/discovery/newDisc',
                    component: DNewDisc,
                    children: [
                        {
                            path: ':id',
                            component: DiscDetail
                        }
                    ]
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
                    component: DRanking,
                    children: [
                        {
                            path: ':id',
                            component: SongListDetail,
                            props: true
                        }
                    ]
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/album',
            component: DiscDetail
        },
        {
            path: '/singer',
            component: SingerDetail
        },
        {
            path: '/songList',
            component: SongListDetail
        },
        {
            path: '/recommendSong',
            component: RecommendSong
        },
        {
            path: '/userFavorite',
            component: UserFavorite
        },
        {
            path: '/myCollection',
            component: MyCollection,
            children: [
                {
                    path: '/myCollection/singer/:id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/myCloud',
            component: MyCloud,
        },
        {
            path: '/recentPlay',
            component: RecentPlay,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/userDetail',
            component: UserDetail,
        }
    ]
});
