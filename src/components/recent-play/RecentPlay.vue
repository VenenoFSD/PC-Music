<template>
    <div class="recent-play" ref="recentPlay">
        <h2 class="title">最近播放</h2>
        <songs :songs="playHistory" @select="selectSong" @playAll="playAll"></songs>
    </div>
</template>

<script>
    import Songs from '../../base/songs/Songs'
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
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        components: {
            Songs
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
</style>
