<template>
    <fade>
        <div class="recommend-song" ref="recommendSong">
            <div class="rs-header">
                <div class="header-container">
                    <div class="date">{{_getDate()}}</div>
                    <div class="desc">
                        <h2 class="title">每日歌曲推荐</h2>
                        <p class="text">根据你的音乐口味生成，每天6:00更新</p>
                    </div>
                </div>
            </div>
            <div class="recommend-song-bg"></div>
            <div class="song-list-wrapper">
                <songs :songs="songs" @playAll="playAll" @select="selectSong"></songs>
            </div>
        </div>
    </fade>
</template>

<script>
    import Fade from '../../base/fade/Fade'
    import Songs from '../../base/songs/Songs'
    import get from '../../common/js/api'
    import {playlistMixin} from "../../common/js/mixin";
    import {mapActions} from 'vuex'

    export default {
        name: "RecommendSong",
        mixins: [playlistMixin],
        data () {
            return {
                songs: []
            }
        },
        methods: {
            getRecommendSong () {
                get('/recommend/songs').then((res) => {
                     this.songs = this._formatSong(res.recommend);
                });
            },
            numFormat (index) {
                return index < 9 ? '0' + (index + 1) : index + 1;
            },
            artistsFormat (artists) {
                let arr = [];
                for (let i = 0; i < artists.length; i++) {
                    arr.push(artists[i].name);
                }
                return arr.join('/');
            },
            durationFormat (time) {
                time = time / 1000 | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.recommendSong.style.bottom = bottom;
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.songs,
                    index
                });
            },
            playAll () {
                this.sequencePlay({
                    list: this.songs
                });
            },
            _getDate () {
                let date = new Date();
                return date.getDate();
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            },
            _formatSong (songs) {
                let result = [];
                for (let i = 0; i < songs.length; i++) {
                    result.push({
                        name: songs[i].name,
                        id: songs[i].id,
                        al: songs[i].album,
                        ar: songs[i].artists,
                        dt: songs[i].duration,
                        alia: songs[i].alias
                    });
                }
                return result;
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        created () {
            this.getRecommendSong();
        },
        components: {
            Fade,
            Songs
        }
    }
</script>

<style scoped>
    .recommend-song {
        position: fixed;
        left: 210px;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-left: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    .recommend-song-bg {
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        height: 180px;
        top: 0;
        background: linear-gradient(to bottom, #f8f4f7, #f9f9fc);
    }
    .rs-header {
        width: 100%;
        height: 180px;
        background: url("./bg.png") no-repeat right top;
        background-size: auto 100%;
        overflow: hidden;
        flex: 0 0 180px;
    }
    .rs-header .header-container {
        display: flex;
        margin: 40px 0 0 30px;
        align-items: center;
    }
    .header-container .date {
        width: 96px;
        line-height: 96px;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 60px;
        background-color: #fff;
        color: #c72e2e;
        margin-right: 20px;
    }
    .desc .title {
        margin-bottom: 16px;
    }
    .song-list-wrapper{
        flex: 1;
        background-color: #fafafc;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
