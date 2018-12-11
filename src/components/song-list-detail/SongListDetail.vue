<template>
    <fade>
        <div class="song-list-detail-wrapper" ref="songListDetailWrapper">
            <div class="song-list-detail">
                <div class="background" :style="{background: 'url(' + songListImg() + ') no-repeat 0 20%'}"></div>
                <p class="title">{{$route.query.title}}</p>
                <div class="song-list-detail-header">
                    <div class="img-wrapper">
                        <img :src="songListImg()" class="img">
                        <div class="playCount"><i class="iconfont icon-headset"></i><span>{{_playCountFormat(songList.playCount)}}</span></div>
                    </div>
                    <div class="desc">
                        <p class="name">{{songList.name}}</p>
                        <div class="creator" v-if="songListDetail.creator">
                            <img :src="songListDetail.creator.avatarUrl" class="creator-avatar">
                            <p class="creator-name">{{songListDetail.creator.nickname}}</p>
                            <p class="create-time">{{_timeFormat(songListDetail.createTime)}} 创建</p>
                        </div>
                        <div class="tags-wrapper" v-if="songListDetail.tags && songListDetail.tags.length">标签：<span class="tags">{{tagsFormat(songListDetail.tags)}}</span></div>
                        <div class="description" v-if="songList.description">介绍：{{songList.description}}</div>
                    </div>
                </div>
                <div class="back" @click="back" v-show="$route.query.desc !== 'user'"><i class="iconfont icon-you"></i></div>
            </div>
            <songs :songs="songListDetail.tracks" @select="selectSong" @playAll="playAll"></songs>
        </div>
    </fade>
</template>

<script>
    //  我喜欢的 / 歌单 / 排行榜
    import Fade from '../../base/fade/Fade'
    import Songs from '../../base/songs/Songs'
    import {mapGetters, mapActions} from 'vuex'
    import get from '../../common/js/api'
    import {playlistMixin} from "../../common/js/mixin";
    import {timeFormat, playCountFormat} from "../../common/js/dataFormat";

    export default {
        mixins: [playlistMixin],
        name: "SongListDetail",
        data () {
            return {
                songListDetail: {}
            }
        },
        methods: {
            getSongListDetail () {
                if (!this.songList.id) {
                    this.$router.back();
                    return;
                }
                get('/playlist/detail', {
                    id: this.songList.id
                }).then((res) => {
                    this.songListDetail = res.playlist;
                });
            },
            back () {
                this.$router.back();
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.songListDetail.tracks,
                    index
                });
            },
            playAll () {
                this.sequencePlay({
                    list: this.songListDetail.tracks
                });
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.songListDetailWrapper.style.bottom = bottom;
            },
            songListImg () {
                return this.songList.coverImgUrl !== undefined ? this.songList.coverImgUrl : this.songList.picUrl;
            },
            tagsFormat(tags) {
                return tags.join(' / ');
            },
            _playCountFormat (playCount) {
                return playCountFormat(playCount);
            },
            _timeFormat (time) {
                return timeFormat(time);
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        computed: {
            ...mapGetters([
                'songList'
            ])
        },
        created () {
            this.getSongListDetail();
        },
        watch: {
            '$route.query': function () {
                if (this.$route.query.id === undefined) {
                    this.songListDetail = {};
                    return;
                }
                this.getSongListDetail();
            }
        },
        components: {
            Fade,
            Songs
        }
    }
</script>

<style scoped>
    .song-list-detail-wrapper {
        position: fixed;
        left: 210px;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: #fafafc;
        border-left: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    .song-list-detail {
        position: relative;
        overflow: hidden;
        background: linear-gradient(to bottom, rgba(255,255,255,.6), #fafafc);
        padding: 16px 30px 0 30px;
        box-sizing: border-box;
        color: #444;
        flex: 0 0 280px;
    }
    .back {
        position: absolute;
        right: 16px;
        top: 16px;
    }
    .back .iconfont {
        font-size: 36px;
        color: #888;
    }
    .background {
        height: 90%;
        z-index: -2;
        position: absolute;
        left: -2%;
        right: -2%;
        top: -20px;
        overflow: hidden;
        background-size: cover!important;
        filter: blur(30px);
    }
    .title {
        font-size: 13px;
        margin-bottom: 20px;
    }
    .song-list-detail-header {
        display: flex;
        height: 200px;
    }
    .img-wrapper {
        position: relative;
        flex: 0 0 200px;
    }
    .img-wrapper .playCount {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        font-size: 12px;
        padding: 1px 4px 0 2px;
        color: #fff;
        background: linear-gradient(to right, transparent , rgba(0,0,0,.2));
    }
    .song-list-detail-header .img {
        width: 200px;
        height: 200px;
    }
    .song-list-detail-header .desc {
        flex: 1;
        padding: 4px 0 0 20px;
    }
    .song-list-detail-header .desc .name {
        font-size: 22px;
        color: #000;
    }
    .creator {
        display: flex;
        align-items: center;
        margin: 14px 0 30px 0;
        font-size: 12px;
    }
    .creator .creator-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
    }
    .creator .creator-name {
        margin: 0 12px;
    }
    .creator .create-time {
        color: #999;
    }
    .tags-wrapper {
        margin-bottom: 10px;
    }
    .tags-wrapper, .description {
        color: #000;
        font-size: 12px;
    }
    .tags-wrapper .tags {
        color: #28619a;
    }
    .description {
        line-height: 24px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
