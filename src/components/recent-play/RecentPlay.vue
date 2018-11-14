<template>
    <div class="recent-play" ref="recentPlay">
        <h2 class="title">最近播放</h2>
        <div class="clear" @click="showConfirm" v-show="playHistory.length"><span class="iconfont icon-iconfontshanchu1"></span>全部清空</div>
        <songs :songs="playHistory" @select="selectSong" @playAll="playAll"></songs>
        <confirm ref="confirm" @confirm="clearPlayHistory"></confirm>
        <p v-show="!playHistory.length" class="no-play">暂无播放历史</p>
    </div>
</template>

<script>
    import Songs from '../../base/songs/Songs'
    import Confirm from '../../base/confirm/Confirm'
    import {playlistMixin} from "../../common/js/mixin";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "RecentPlay",
        mixins: [playlistMixin],
        methods: {
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.recentPlay.style.bottom = bottom;
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.playHistory,
                    index
                });
            },
            playAll () {
                this.sequencePlay({
                    list: this.playHistory
                });
            },
            showConfirm () {
                this.$refs.confirm.show();
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay',
                'clearPlayHistory'
            ])
        },
        components: {
            Songs,
            Confirm
        },
        computed: {
            ...mapGetters([
                'playHistory'
            ])
        }
    }
</script>

<style scoped>
    .recent-play {
        position: fixed;
        left: 210px;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        border-left: 1px solid #ddd;
        background-color: #fafafc;
    }
    .title {
        font-size: 12px;
        color: #444;
        margin: 0 30px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }
    .clear {
        position: absolute;
        top: 73px;
        right: 30px;
    }
    .no-play {
        margin-top: 140px;
        font-size: 13px;
        color: #999;
        text-align: center;
    }
</style>
