<template>
    <div class="d-recommend-wrapper">
        <div class="d-recommend" v-show="dRecommendShow">
            <div class="banner-wrapper">
                <swiper :options="swiperOption" v-if="showSwiper">
                    <swiper-slide v-for="(item, index) in banners" :key="index">
                        <img :src="item.picUrl" class="banner-img">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="re-song-list-wrapper">
                <h2 class="title"><i class="iconfont icon-tuijian"></i>推荐歌单</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="item in recommendSongList" :key="item.id" class="item sl-item">
                        <div class="img-wrapper">
                            <img :src="item.picUrl" class="img">
                            <div class="playCount"><i class="iconfont icon-headset"></i><span>{{playCountFormat(item.playCount)}}</span></div>
                            <div class="cover"></div>
                        </div>
                        <p class="text">{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="re-private-content-wrapper">
                <h2 class="title"><i class="iconfont icon-fangsong"></i>独家放送</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="item in privateContent" class="item pc-item">
                        <div class="img-wrapper">
                            <img :src="item.sPicUrl" class="img">
                            <div class="cover"></div>
                        </div>
                        <p class="text">{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="re-new-song">
                <h2 class="title"><i class="iconfont icon-cl-music"></i>最新音乐</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="(item, index) in newSong" class="ns-item" :class="_nsItemClass(index)">
                        <p class="num">{{_rankFormat(index)}}</p>
                        <img :src="item.song.album.blurPicUrl" class="ns-img">
                        <div class="desc">
                            <p class="song-name-wrapper">
                                <span class="song-name">{{item.name}}</span>
                                <span class="song-desc" v-if="item.song.alias.length">（{{item.song.alias[0]}}）</span>
                            </p>
                            <p class="singer">{{item.song.artists[0].name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="re-mv">
                <h2 class="title"><i class="iconfont icon-mv"></i>推荐MV</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="item in recommendMV" class="item mv-item">
                        <div class="img-wrapper">
                            <img :src="item.picUrl" class="img">
                            <div class="playCount"><i class="iconfont icon-headset"></i><span>{{playCountFormat(item.playCount)}}</span></div>
                            <div class="cover"></div>
                        </div>
                        <div class="desc">
                            <p class="name">{{item.name}}</p>
                            <p class="artist-name">{{item.artistName}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="re-radio">
                <h2 class="title"><i class="iconfont icon-diantai"></i>推荐电台</h2>
                <separate></separate>
                <ul class="list r-list">
                    <li v-for="item in recommendRadio" class="item r-item">
                        <div class="img-wrapper">
                            <img :src="item.picUrl" class="img">
                            <div class="cover"></div>
                            <div class="icon">
                                <i class="iconfont icon-play"></i>
                            </div>
                        </div>
                        <div class="desc-wrapper">
                            <p class="name">{{item.name}}</p>
                            <p class="desc">{{item.program.radio.name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <load v-show="showLoad"></load>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import Load from '../../base/load/Load'
    import axios  from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "DRecommend",
        data () {
            return {
                banners: [],
                recommendSongList: [],
                privateContent: [],
                newSong: [],
                recommendMV: [],
                recommendRadio: [],
                swiperOption: {
                    effect: 'coverflow',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        depth: 240,
                        rotate: 0,
                        stretch: 60
                    },
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    onlyExternal: true,
                    loop: true,
                    autoplay: 5000,
                    speed: 800,
                    autoplayDisableOnInteraction: false
                },
                showLoad: true,
                dRecommendShow: false
            }
        },
        methods: {
            getBanner () {
                axios.get(`http://localhost:3000/banner`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.banners = res.data.banners;
                    }
                });
            },
            getRecommendSongList () {
                axios.get(`http://localhost:3000/personalized`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.recommendSongList = res.data.result.slice(0, 10);
                    }
                });
            },
            getPrivateContent () {
                axios.get(`http://localhost:3000/personalized/privatecontent`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.privateContent = res.data.result;
                    }
                });
            },
            getNewSong () {
                axios.get(`http://localhost:3000/personalized/newsong`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.newSong = res.data.result;
                    }
                });
            },
            getRecommendMV () {
                axios.get(`http://localhost:3000/personalized/mv`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.recommendMV = res.data.result;
                    }
                });
            },
            getRecommendRadio () {
                axios.get(`http://localhost:3000/personalized/djprogram`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.recommendRadio = res.data.result;
                    }
                });
            },
            playCountFormat (playCount) {
                playCount = Math.floor(playCount);
                if (playCount < 100000) {
                    return playCount;
                } else {
                    playCount = playCount.toString();
                    let len = playCount.length;
                    let cutLen = len - 4;
                    return playCount.substr(0, cutLen) + '万';
                }
            },
            _loadPage() {
                this.getBanner();
                this.getRecommendSongList();
                this.getPrivateContent();
                this.getNewSong();
                this.getRecommendMV();
                this.getRecommendRadio();
            },
            _nsItemClass (item) {
                if (item === 0 || item === 4 || item === 8) {
                    return 'bgc border';
                } else if (item === 2 || item === 6) {
                    return 'border';
                } else if (item === 1 || item === 5 || item === 9) {
                    return 'bgc';
                } else {
                    return '';
                }
            },
            _rankFormat (index) {
                if (index < 9) {
                    return '0' + (index + 1);
                } else {
                    return index + 1;
                }
            }
        },
        created () {
            this._loadPage();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showLoad = false;
                this.dRecommendShow = true;
            }, 2500);
        },
        computed: {
            showSwiper () {
                return this.banners.length;
            }
        },
        components: {
            swiper,
            swiperSlide,
            Separate,
            Load
        }
    }
</script>

<style scoped>
    .d-recommend-wrapper {
        flex: 1;
        overflow: auto;
    }
    .d-recommend {
        max-width: 1200px;
        margin: 0 auto;
        transform: translate3d(4px, 0, 0);
        padding: 30px 20px 0 20px;
    }
    .banner-wrapper {
        margin-bottom: 50px;
        text-align: center;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
        width: 70%;
        max-width: 660px;
    }
    .swiper-container .swiper-wrapper .banner-img {
        width: 100%;
    }
    .banner-wrapper >>> .swiper-pagination-bullets {
        bottom: 15px;
    }
    .banner-wrapper >>> .swiper-pagination-bullet {
        width: 20px;
        height: 1px;
        opacity: 1;
        background-color: #eee;
        margin: 0 3px;
        border-radius: 0;
    }
    .banner-wrapper >>> .swiper-pagination-bullet-active {
        background-color: #ec0000;
    }
    .list {
        display: flex;
        margin-top: 12px;
        overflow: hidden;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .list .item .img-wrapper {
        position: relative;
        font-size: 0;
    }
    .list .item .img-wrapper .cover {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        transition: opacity 0.6s;
    }
    .list .item .img-wrapper:hover .cover {
        opacity: 1;
    }
    .list .item .img {
        width: 100%;
    }
    .list .sl-item {
        width: 18.6%;
        flex: 0 0 18.6%;
        margin-bottom: 30px;
    }
    .list .pc-item {
        width: 32%;
        flex: 0 0 32%;
    }
    .list .ns-item {
        width: 50%;
        flex: 0 0 50%;
        height: 64px;
        display: flex;
        align-items: center;
    }
    .list .ns-item:hover {
        background-color: #eee!important;
    }
    .list .ns-item.bgc {
        background-color: #f4f4f6;
    }
    .list .ns-item.border {
        border-right: 1px solid #ddd;
        box-sizing: border-box;
    }
    .list .ns-item .num {
        width: 40px;
        text-align: center;
        flex: 0 0 40px;
    }
    .list .ns-item .ns-img {
        width: 54px;
        height: 54px;
        margin-right: 14px;
        flex: 0 0 54px;
    }
    .list .ns-item .desc {
        flex: 1;
    }
    .list .ns-item .desc .song-name-wrapper {
        font-size: 16px;
        margin-bottom: 4px;
        white-space: nowrap;
    }
    .list .ns-item .desc .song-name-wrapper .song-desc {
        color: #aaa;
    }
    .list .ns-item .desc .singer {
        font-size: 12px;
        color: #aaa;
    }
    .list .mv-item {
        width: 24%;
        flex: 0 0 24%;
    }
    .list .mv-item .desc .name{
        font-size: 16px;
        margin: 8px 0 2px 0;
    }
    .list .mv-item .desc .artist-name {
        font-size: 12px;
        color: #aaa;
    }
    .list.r-list {
        margin-top: 0;
    }
    .list .r-item {
        width: 50%;
        flex:  0 0 50%;
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #ddd;
    }
    .list .r-item:hover .img-wrapper .cover {
        opacity: 1;
    }
    .list .r-item .img-wrapper {
        flex: 0 0 70px;
        margin-right: 10px;
    }
    .list .r-item .img {
        width: 70px;
        height: 70px;
    }
    .list .r-item .icon {
        position: absolute;
        right: 4px;
        bottom: 4px;
        color: #fff;
        border-radius: 50%;
        border: 1px solid #aaa;
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        background-color: rgba(0,0,0,.5);
        z-index: 2;
    }
    .list .r-item .icon .iconfont {
        font-size: 12px;
        margin-right: -2px;
    }
    .list .r-item .desc-wrapper .name {
        font-size: 16px;
        color: #000;
        margin-bottom: 10px;
    }
    .list .r-item .desc-wrapper .desc{
        color: #aaa;
        font-size: 12px;
    }
    .list .item .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 6px;
        font-size: 15px;
    }
    .list .item .img-wrapper .playCount {
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        font-size: 12px;
        padding: 1px 4px 0 2px;
        color: #fff;
        background: linear-gradient(to right, transparent , rgba(0,0,0,.2));
    }
    .list .item .img-wrapper .playCount .iconfont {
        vertical-align: top;
        margin-right: 2px;
    }
    .list .item .img-wrapper .playCount span {
        vertical-align: top;
    }
    .title {
        font-size: 15px;
        margin-bottom: 15px;
    }
    .title .iconfont {
        color: #c70000;
        margin-right: 6px;
    }
    .re-private-content-wrapper {
        margin: 20px 0 50px 0;
    }
    .re-mv {
        margin: 50px 0;
    }
</style>
