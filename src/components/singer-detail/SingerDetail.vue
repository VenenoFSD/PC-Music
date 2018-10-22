<template>
    <fade>
        <div class="singer-detail-wrapper">
            <div class="singer-detail">
                <div class="background" :style="{background: 'url(' + singerDetail.img1v1Url + ') no-repeat 0 20%'}">
                </div>
                <p class="title">歌手</p>
                <div class="singer-detail-header">
                    <img :src="singerDetail.img1v1Url" class="img">
                    <div class="desc">
                        <p class="name">{{singerDetail.name}}</p>
                        <p class="alias" v-if="singerDetail.alias">{{alias(singerDetail.alias, singerDetail.trans)}}</p>
                        <p class="count-wrapper"><i class="iconfont icon-diantai"></i>单曲数：<span class="count">{{singerDetail.musicSize}}</span></p>
                        <p class="count-wrapper"><i class="iconfont icon-cl-music"></i>专辑数：<span class="count">{{singerDetail.albumSize}}</span></p>
                        <p class="count-wrapper"><i class="iconfont icon-mv"></i>MV数：<span class="count">{{singerDetail.mvSize}}</span></p>
                    </div>
                </div>
                <div class="singer-select-wrapper">
                    <ul class="singer-select">
                        <li class="ss-item" v-for="item in select" :class="{'active': currentSelect === item.code}" @click="selectItem(item)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="back" @click="back"><i class="iconfont icon-you"></i></div>
            </div>
            <songs v-show="currentSelect === 'hot'" :songs="songs" @select="selectSong"></songs>
            <singer-album v-show="currentSelect === 'album'" :singerId="singer.id" :currentSelect="currentSelect"></singer-album>
            <singer-desc v-show="currentSelect === 'desc'" :singerId="singer.id" :name="singer.name"></singer-desc>
        </div>
    </fade>
</template>

<script>
    import Songs from '../../base/songs/Songs'
    import Fade from '../../base/fade/Fade'
    import SingerAlbum from '../singer-album/SingerAlbum'
    import SingerDesc from '../singer-desc/SingerDesc'
    import {mapGetters, mapActions} from 'vuex'
    import get from "../../common/js/api";

    export default {
        name: "SingerDetail",
        data () {
            return {
                singerDetail: {},
                songs: [],
                select: [
                    {
                        name: '热门50',
                        code: 'hot'
                    },
                    {
                        name: '专辑',
                        code: 'album'
                    },
                    {
                        name: '歌手详情',
                        code: 'desc'
                    }
                ],
                currentSelect: 'hot'
            }
        },
        methods: {
            getSingerDetail () {
                if (!this.singer.id) {
                    this.$router.push('/discovery/singer');
                    return;
                }
                get('/artists', {
                    id: this.singer.id
                }).then((res) => {
                    this.singerDetail = res.artist;
                    this.songs = res.hotSongs;
                });
            },
            alias (alias, trans) {
                let str =  alias.join('; ');
                if (trans !== '') {
                    str += '; ' + trans;
                }
                return str;
            },
            selectItem (item) {
                this.currentSelect = item.code;
            },
            back () {
                this.$router.back();
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.songs,
                    index
                });
            },
            ...mapActions([
                'selectPlay'
            ])
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created () {
            this.getSingerDetail();
        },
        components: {
            Songs,
            SingerAlbum,
            SingerDesc,
            Fade
        }
    }
</script>

<style scoped>
    .singer-detail-wrapper {
        position: fixed;
        left: 210px;
        top: 0;
        right: 0;
        bottom: 60px;
        z-index: 3;
        background-color: #fafafc;
        border-left: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    .singer-detail {
        position: relative;
        overflow: hidden;
        background: linear-gradient(to bottom, rgba(255,255,255,.6), #fafafc);
        padding: 16px 30px 0 30px;
        box-sizing: border-box;
        color: #444;
        flex: 0 0 310px;
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
        filter: blur(26px);
    }
    .title {
        font-size: 13px;
        margin-bottom: 20px;
    }
    .singer-detail-header {
        display: flex;
        height: 200px;
    }
    .singer-detail-header .img {
        width: 200px;
        height: 200px;
        flex: 0 0 200px;
    }
    .singer-detail-header .desc {
        flex: 1;
        padding: 4px 0 0 20px;
    }
    .singer-detail-header .desc .name {
        font-size: 22px;
        color: #000;
    }
    .singer-detail-header .desc .alias {
        font-size: 12px;
        color: #777;
        margin: 20px 0 10px 0;
    }
    .singer-detail-header .desc .count-wrapper {
        color: #000;
        font-size: 12px;
        line-height: 24px;
    }
    .singer-detail-header .desc .count-wrapper .count {
        color: #777;
    }
    .singer-detail-header .desc .count-wrapper .iconfont {
        color: #444;
        margin-right: 4px;
        vertical-align: middle;
    }
    .singer-select-wrapper {
        border-bottom: 1px solid #ddd;
    }
    .singer-select {
        width: 230px;
        height: 36px;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        color: #000;
        line-height: 36px;
    }
    .singer-select .ss-item.active {
        color: #ec0000;
        border-bottom: 2px solid #ec0000;
    }
</style>
