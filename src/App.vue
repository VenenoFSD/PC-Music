<template>
    <div id="app" ref="app">
        <div class="left-list-wrapper">
            <left-list></left-list>
        </div>
        <div class="right-page">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <player></player>
    </div>
</template>

<script>
    import LeftList from './components/left-list/LeftList'
    import Player from './components/player/Player'
    import {playlistMixin} from "./common/js/mixin";

    export default {
        mixins: [playlistMixin],
        name: 'App',
        methods: {
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.app.style.bottom = bottom;
            }
        },
        components: {
            LeftList,
            Player
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
</style>
