<template>
    <fade>
        <div class="disc-detail-wrapper" ref="discDetailWrapper">
            <div class="disc-detail">
                <div class="background" :style="{background: 'url(' + newDisc.picUrl + ') no-repeat 0 20%'}"></div>
                <p class="title">专辑</p>
                <div class="disc-detail-header">
                    <div class="img-wrapper">
                        <img :src="newDisc.picUrl" class="img">
                    </div>
                    <div class="desc">
                        <p class="name">{{newDisc.name}}<span v-if="newDisc.alias.length">（{{newDisc.alias[0]}}）</span></p>
                        <div class="creator">
                            <p>歌手：<span class="singer-name">{{newDisc.artist.name}}</span>发行时间：{{timeFormat(newDisc.publishTime)}}</p>
                        </div>
                        <div class="description" v-if="discDetail && discDetail.album">介绍：{{discDetail.album.description}}</div>
                    </div>
                </div>
                <div class="back" @click="back"><i class="iconfont icon-you"></i></div>
            </div>
            <songs :songs="discDetail.songs" @select="selectSong" @playAll="playAll"></songs>
        </div>
    </fade>
</template>

<script>
    import Fade from '../../base/fade/Fade'
    import Songs from '../../base/songs/Songs'
    import get from "../../common/js/api";
    import {mapGetters, mapActions} from 'vuex'
    import {playlistMixin} from "../../common/js/mixin";

    export default {
        name: "DiscDetail",
        mixins: [playlistMixin],
        data () {
            return {
                discDetail: {}
            }
        },
        methods: {
            getDiscDetail () {
                if (!this.newDisc.id) {
                    this.$router.back();
                    return;
                }
                get('/album', {
                    id: this.newDisc.id
                }).then((res) => {
                    this.discDetail = res;
                });
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.discDetailWrapper.style.bottom = bottom;
            },
            back () {
                this.$router.back();
            },
            timeFormat (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                return `${year}-${month}-${day}`;
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.discDetail.songs,
                    index
                });
            },
            playAll () {
                this.sequencePlay({
                    list: this.discDetail.songs
                });
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        created () {
            this.getDiscDetail();
        },
        components: {
            Fade,
            Songs
        },
        computed: {
            ...mapGetters([
                'newDisc'
            ])
        }
    }
</script>

<style scoped>
    .disc-detail-wrapper {
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
    .disc-detail {
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
    .disc-detail-header {
        display: flex;
        height: 200px;
    }
    .disc-detail-header .img-wrapper {
        height: 200px;
        flex: 0 0 239px;
        font-size: 0;
        background: url("./coverall.png") no-repeat 0 0;
        background-size: 100% 100%;
    }
    .disc-detail-header .img {
        width: 200px;
        height: 200px;
    }
    .disc-detail-header .desc {
        flex: 1;
        padding: 4px 0 0 20px;
    }
    .disc-detail-header .desc .name {
        font-size: 22px;
        color: #000;
    }
    .creator {
        display: flex;
        align-items: center;
        margin: 14px 0 40px 0;
        font-size: 12px;
        color: #aaa;
    }
    .creator .singer-name {
        color: #275b91;
        margin-right: 14px;
    }
    .description {
        line-height: 24px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 12px;
        color: #aaa;
    }
</style>
