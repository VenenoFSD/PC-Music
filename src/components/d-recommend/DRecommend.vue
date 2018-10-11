<template>
    <div class="d-recommend">
        <div class="banner-wrapper">
            <swiper :options="swiperOption" v-if="showSwiper">
                <swiper-slide v-for="(item, index) in recommend" :key="index">
                    <img :src="item.picUrl" class="banner-img">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
    import axios  from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "DRecommend",
        data () {
            return {
                recommend: [],
                swiperOption: {
                    effect: 'coverflow',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        depth: 240,
                        rotate: -20,
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
                        this.recommend = res.data.banners;
                    }
                });
            }
        },
        created () {
            this.getBanner();
        },
        computed: {
            showSwiper () {
                return this.recommend.length;
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    .banner-wrapper {
        max-width: 1300px;
        margin: 40px auto;
        text-align: center;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
        width: 640px;
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
</style>
