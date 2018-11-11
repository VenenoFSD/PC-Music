<template>
    <div class="my-collection" ref="myCollection">
        <h2 class="title">我的收藏</h2>
        <p class="desc">目前只支持歌手收藏列表</p>
        <separate></separate>
        <ul class="mc-list">
            <li class="mc-item" v-for="(item, index) in collect" :class="{'bg': index % 2 === 0}" @click="selectItem(item)">
                <img :src="item.img1v1Url" class="img">
                <p class="name">{{item.name}}</p>
                <p class="album-count">专辑：{{item.albumSize}}</p>
                <p class="mv-count">MV：{{item.mvSize}}</p>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import {playlistMixin} from "../../common/js/mixin";
    import {mapMutations} from 'vuex'
    import get from '../../common/js/api'

    export default {
        name: "MyCollection",
        mixins: [playlistMixin],
        data () {
            return {
                collect: []
            }
        },
        methods: {
            getMyCollection () {
                get('/artist/sublist').then((res) => {
                    this.collect = res.data;
                });
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.myCollection.style.bottom = bottom;
            },
            selectItem (item) {
                this.setSinger(item);
                this.$router.push(`/myCollection/singer/${item.id}`);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        created () {
            this.getMyCollection();
        },
        components: {
            Separate
        }
    }
</script>

<style scoped>
    .my-collection {
        position: fixed;
        left: 210px;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
        border-left: 1px solid #ddd;
        background-color: #fafafc;
    }
    .my-collection .title {
        font-size: 12px;
        color: #444;
        margin-bottom: 10px;
    }
    .desc {
        font-size: 12px;
        color: #aaa;
        position: absolute;
        top: 20px;
        right: 20px;
    }
    .mc-list {
        padding-top: 20px;
    }
    .mc-item {
        display: flex;
        padding: 8px 0 8px 6px;
        line-height: 50px;
        font-size: 12px;
        color: #999;
    }
    .mc-item.bg {
        background-color: #f4f4f6;
    }
    .mc-item.bg .img{
        border: 1px solid #ddd;
        box-sizing: border-box;
    }
    .mc-item:hover {
        background-color: #f0f0f2;
    }
    .mc-item .img {
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
    .mc-item .name {
        flex: 0 0 calc(60% - 60px);
        font-size: 14px;
        color: #000;
    }
    .mc-item .album-count {
        flex: 0 0 20%;
    }
    .mc-item .mv-count {
        flex: 0 0 20%;
    }
</style>
