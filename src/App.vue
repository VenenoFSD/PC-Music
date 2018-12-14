<template>
    <div id="app" ref="app">
        <div class="left-list-wrapper">
            <left-list ref="leftList"></left-list>
        </div>
        <div class="right-page">
            <keep-alive exclude="UserDetail,UserFavorite">
                <router-view></router-view>
            </keep-alive>
        </div>
        <div class="check" v-show="showCheck">
            <load></load>
            <p class="text">正在检测登录状态...</p>
        </div>
        <player></player>
    </div>
</template>

<script>
    import LeftList from './components/left-list/LeftList'
    import Player from './components/player/Player'
    import Load from './base/load/Load'
    import {playlistMixin} from "./common/js/mixin";
    import {mapMutations} from 'vuex'
    import get from './common/js/api'

    export default {
        mixins: [playlistMixin],
        name: 'App',
        data () {
            return {
                showCheck: true
            }
        },
        methods: {
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.app.style.bottom = bottom;
            },
            checkLoginStatus () {
                const cookieReg = /__csrf/;
                if (cookieReg.test(document.cookie)) {
                    get('/login/status').then((res) => {
                        this.setLoginInfo(res);
                        this.$router.push('/discovery');
                    });
                } else {
                    this.$router.push('/login');
                }
            },
            ...mapMutations({
                setLoginInfo: 'SET_LOGIN_INFO'
            })
        },
        components: {
            LeftList,
            Player,
            Load
        },
        created () {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showCheck = false;
                this.checkLoginStatus();
            }, 1000);
        }
    }
</script>

<style scoped>
    #app {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
    }
    #app .right-page {
        flex: 1;
        border-left: 1px solid #ddd;
        overflow-x: hidden;
    }
    .check {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 5;
        background-color: #fff;
    }
    .check .text {
        text-align: center;
        margin-top: 40px;
        font-size: 16px;
    }
</style>
