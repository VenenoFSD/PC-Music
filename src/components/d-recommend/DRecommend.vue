<template>
    <div class="d-recommend">
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
            <ul class="re-song-list">
                <li v-for="item in recommendSongList" :key="item.id" class="sl-item">
                    <div class="img-wrapper">
                        <img :src="item.picUrl" class="sl-img">
                    </div>
                    <p class="text">{{item.name}}</p>
                    <div class="playCount"><i class="iconfont icon-headset"></i><span>{{playCountFormat(item.playCount)}}</span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import axios  from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "DRecommend",
        data () {
            return {
                banners: [],
                recommendSongList: [],
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
                }
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
                // axios.get(`http://localhost:3000/recommend/resource`).then((res) => {
                //     if (res.data && res.data.code === 200) {
                //         this.recommendSongList = res.data.recommend;
                //     }
                // });
                axios.get(`http://localhost:3000/personalized`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.recommendSongList = res.data.result.slice(0, 10);
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
            }
        },
        created () {
            this.getBanner();
            this.getRecommendSongList();
        },
        computed: {
            showSwiper () {
                return this.banners.length;
            }
        },
        components: {
            swiper,
            swiperSlide,
            Separate
        }
    }
</script>

<style scoped>
    .d-recommend {
        max-width: 1300px;
        margin: 0 auto;
    }
    .banner-wrapper {
        margin: 30px 0 50px 0;
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
    .re-song-list {
        display: flex;
        max-width: 1300px;
        margin: 12px auto;
        overflow: hidden;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .re-song-list .sl-item {
        width: 18%;
        flex: 0 0 18%;
        margin-bottom: 30px;
        position: relative;
    }
    .re-song-list .sl-item:hover {
        opacity: 0.8;
    }
    .re-song-list .sl-item .sl-img {
        width: 100%;
    }
    .re-song-list .sl-item .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 6px;
        font-size: 15px;
    }
    .re-song-list .sl-item .playCount {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        padding: 1px 4px 0 2px;
        color: #fff;
        background: linear-gradient(to right, transparent , rgba(0,0,0,.2));;
    }
    .re-song-list .sl-item .playCount .iconfont {
        vertical-align: top;
        margin-right: 2px;
    }
    .re-song-list .sl-item .playCount span {
        vertical-align: top;
    }
    .title {
        font-size: 16px;
        margin-bottom: 16px;
    }
    .title .iconfont {
        color: #c70000;
        margin-right: 6px;
    }
</style>
