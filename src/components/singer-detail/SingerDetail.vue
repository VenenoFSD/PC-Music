<template>
    <div class="singer-detail-wrapper">
        <div class="singer-detail">
            <div class="background" :style="{background: 'url(' + singerDetail.img1v1Url + ') no-repeat 0 20%'}">
            </div>
            <p class="title">歌手</p>
            <div class="singer-desc">
                <img :src="singerDetail.img1v1Url" class="img">
                <div class="desc">
                    <p class="name">{{singerDetail.name}}</p>
                    <p class="alias" v-if="singerDetail.alias">{{alias(singerDetail.alias, singerDetail.trans)}}</p>
                    <p class="count-wrapper"><i class="iconfont icon-diantai"></i>单曲数：<span class="count">{{singerDetail.musicSize}}</span></p>
                    <p class="count-wrapper"><i class="iconfont icon-cl-music"></i>专辑数：<span class="count">{{singerDetail.albumSize}}</span></p>
                    <p class="count-wrapper"><i class="iconfont icon-mv"></i>MV数：<span class="count">{{singerDetail.mvSize}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Songs from '../../base/songs/Songs'
    import {mapGetters} from 'vuex'
    import axios from 'axios'

    export default {
        name: "SingerDetail",
        data () {
            return {
                singerDetail: {},
                songs: []
            }
        },
        methods: {
            getSingerDetail () {
                if (!this.singer.id) {
                    this.$router.push('/discovery/singer');
                    return;
                }
                axios.get(`http://localhost:3000/artists?id=${this.singer.id}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.singerDetail = res.data.artist;
                        this.songs = res.data.hotSongs;
                    }
                });
            },
            alias (alias, trans) {
                let str =  alias.join('; ');
                if (trans !== '') {
                    str += '; ' + trans;
                }
                return str;
            }
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
            Songs
        }
    }
</script>

<style scoped>
    .singer-detail-wrapper {
        position: fixed;
        left: 210px;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: #fafafc;
        border-left: 1px solid #ddd;
    }
    .singer-detail {
        position: relative;
        height: 300px;
        overflow: hidden;
        background: linear-gradient(to bottom, rgba(255,255,255,.6), #fafafc);
        padding: 16px 30px 0 30px;
        box-sizing: border-box;
        color: #444;
        border-bottom: 1px solid #ddd;
    }
    .background {
        height: 100%;
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
    .singer-desc {
        display: flex;
        height: 200px;
    }
    .singer-desc .img {
        width: 200px;
        height: 200px;
        flex: 0 0 200px;
    }
    .singer-desc .desc {
        flex: 1;
        padding: 4px 0 0 20px;
    }
    .singer-desc .desc .name {
        font-size: 22px;
        color: #000;
    }
    .singer-desc .desc .alias {
        font-size: 12px;
        color: #777;
        margin: 20px 0 10px 0;
    }
    .singer-desc .desc .count-wrapper {
        color: #000;
        font-size: 12px;
        line-height: 24px;
    }
    .singer-desc .desc .count-wrapper .count {
        color: #777;
    }
    .singer-desc .desc .count-wrapper .iconfont {
        color: #444;
        margin-right: 4px;
        vertical-align: middle;
    }
</style>
