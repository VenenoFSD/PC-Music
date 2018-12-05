<template>
    <div class="d-singer-wrapper" @scroll="handleScroll" ref="dSingerWrapper">
        <div class="d-singer" ref="dSinger">
            <div class="singer-tag-wrapper">
                <div class="singer-tag">
                    <h2 class="tag-title">{{sLang.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sLang.lists" class="tl-item" @click="langSelect(index)" :class="{'active': item === currentLang}">{{item.name}}</li>
                    </ul>
                </div>
                <div class="singer-tag">
                    <h2 class="tag-title">{{sSort.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sSort.lists" class="tl-item" @click="sortSelect(index)" :class="{'active': item === currentSort}">{{item.name}}</li>
                    </ul>
                </div>
                <div class="singer-tag">
                    <h2 class="tag-title">{{sFilter.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sFilter.lists" class="tl-item" @click="filterSelect(index)" :class="{'active': item === currentFilter}">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="singer-list-wrapper">
                <div class="singer-list-title">
                    <h1 class="title">{{currentSinger}}</h1>
                    <p class="back" v-show="showBack" @click="back">所有热门歌手 >></p>
                </div>
                <ul class="single-list" v-show="showContent">
                    <li v-for="item in singerList" class="sl-item" :key="item.id" @click="selectSinger(item)">
                        <div class="img-wrapper">
                            <img v-lazy="item.img1v1Url" class="img">
                            <div class="cover"></div>
                        </div>
                        <div class="desc">
                            <p class="name">{{item.name}}</p>
                            <i class="iconfont icon-yonghu"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <load v-show="showLoad"></load>
            <continue-load v-show="showContent && hasMore"></continue-load>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Load from '../../base/load/Load'
    import ContinueLoad from '../../base/continue-load/ContinueLoad'
    import get from '../../common/js/api'
    import {mapMutations} from 'vuex'
    import scrollToEnd from "../../common/js/scroll";
    import {delayShowMixin} from "../../common/js/mixin";
    import {isEmptyObject} from "../../common/js/util";

    const REQUEST_COUNT = 40;

    export default {
        name: "DSinger",
        mixins: [delayShowMixin],
        data () {
            return {
                sLang: {
                    title: '语种',
                    lists: [
                        {
                            name: '华语',
                            code: '100'
                        },
                        {
                            name: '欧美',
                            code: '200'
                        },
                        {
                            name: '日本',
                            code: '600'
                        },
                        {
                            name: '韩国',
                            code: '700'
                        },
                        {
                            name: '其他',
                            code: '400'
                        },
                    ]
                },
                sSort: {
                    title: '分类',
                    lists: [
                        {
                            name: '男歌手',
                            code: '1'
                        },
                        {
                            name: '女歌手',
                            code: '2'
                        },
                        {
                            name: '乐队组合',
                            code: '3'
                        }
                    ]
                },
                sFilter: {
                    title: '筛选',
                    lists: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
                },
                currentLang: {},
                currentSort: {},
                currentFilter: '热门',
                singerList: [],
                offset: 0,
                hasMore: false
            }
        },
        methods: {
            firstGet () {
                get('/top/artists', {
                    limit: REQUEST_COUNT
                }).then((res) => {
                    this.singerList = res.artists;
                    this.hasMore = res.more;
                });
            },
            langSelect (index) {
                this.currentLang = this.sLang.lists[index];
                if (isEmptyObject(this.currentSort)) {  //  第一次进入页面
                    this.currentSort = this.sSort.lists[0];
                    this.loadShow(this.changeGet);
                }
            },
            sortSelect (index) {
                this.currentSort = this.sSort.lists[index];
                if (isEmptyObject(this.currentLang)) {
                    this.currentLang = this.sLang.lists[0];
                    this.loadShow(this.changeGet);
                }
            },
            filterSelect (index) {
                if (isEmptyObject(this.currentLang)) {
                    this.currentLang = this.sLang.lists[0];
                    this.currentSort = this.sSort.lists[0];
                }
                this.currentFilter = this.sFilter.lists[index];
            },
            back () {
                this.currentLang = {};
                this.currentSort = {};
                if (this.currentFilter === '热门') {
                    this.loadShow(this.firstGet);
                } else {
                    this.currentFilter = '热门';
                }
            },
            loadShow (fn) {
                this.showLoad = true;
                this.showContent = false;
                this.delayShow(fn, 2500);
            },
            changeGet () {
                let initial = this.currentFilter === '热门' ? '' : this.currentFilter;
                get('/artist/list', {
                    limit: REQUEST_COUNT,
                    cat: this.requestCode,
                    initial
                }).then((res) => {
                    this.singerList = res.artists;
                    this.hasMore = res.more;
                });
            },
            getMore () {
                if (!this.hasMore) {
                    return;
                }
                let initial = this.currentFilter === '热门' ? '' : this.currentFilter;
                get('/artist/list', {
                    limit: 30,
                    offset: this.offset,
                    cat: this.requestCode,
                    initial
                }).then((res) => {
                    this.singerList = this.singerList.concat(res.artists);
                    this.hasMore = res.more;
                });
            },
            handleScroll () {
                scrollToEnd(this.$refs.dSingerWrapper, this.$refs.dSinger, this.getMore);
            },
            selectSinger (singer) {
                this.setSinger(singer);
                this.$router.push(`/discovery/singer/${singer.id}`);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        computed: {
            currentSinger () {
                if (isEmptyObject(this.currentLang)) {
                    return '所有热门歌手';
                } else {
                    return this.currentLang.name + this.currentSort.name;
                }
            },
            showBack () {
                return !(isEmptyObject(this.currentLang));
            },
            requestCode () {
                if (isEmptyObject(this.currentLang)) {
                    return '';
                }
                return this.currentLang.code + this.currentSort.code;
            }
        },
        watch: {
            currentLang (newSort, oldSort) {
                if (isEmptyObject(newSort) || isEmptyObject(oldSort)) {  //  返回全部热门页面或者第一次进入页面的情况
                    return;
                }
                this.loadShow(this.changeGet);
            },
            currentSort (newSort, oldSort) {
                if (isEmptyObject(newSort) || isEmptyObject(oldSort)) {
                    return;
                }
                this.loadShow(this.changeGet);
            },
            currentFilter () {
                this.loadShow(this.changeGet);
            },
            singerList (newList) {
                this.offset = newList.length;
            }
        },
        created () {
            this.loadShow(this.firstGet);
        },
        components: {
            Load,
            ContinueLoad
        }
    }
</script>

<style scoped>
    .d-singer-wrapper {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .d-singer {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .singer-tag, .tag-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .singer-tag {
        margin-bottom: 16px;
    }
    .singer-tag:last-child {
        margin-bottom: 0;
    }
    .tag-title {
        font-size: 12px;
        color: #4c4c4c;
        margin-right: 6px;
    }
    .tl-item {
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        color: #999;
        padding: 0 12px;
        border-right: 1px solid #e0e0e0;
    }
    .tl-item:first-child {
        padding-left: 0;
    }
    .tl-item:last-child {
        padding-right: 0;
        border: none;
    }
    .tl-item.active {
        color: #e20000;
    }
    .singer-list-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 40px 0 30px 0;
    }
    .singer-list-title .title {
        font-size: 20px;
    }
    .singer-list-title .back {
        font-size: 12px;
        color: #999;
    }
    .single-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .single-list .sl-item {
        width: 18.5%;
        flex: 0 0 18.5%;
        margin-bottom: 30px;
    }
    .single-list .sl-item:hover .img-wrapper .cover {
        opacity: 1;
    }
    .single-list .sl-item .img-wrapper {
        position: relative;
        font-size: 0;
    }
    .single-list .sl-item .img-wrapper .cover {
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
    .single-list .sl-item .img-wrapper img {
        width: 100%;
    }
    .single-list .sl-item .desc {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        font-size: 15px;
        align-items: center;
        color: #000;
    }
    .single-list .sl-item .desc .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .single-list .sl-item .desc .iconfont {
        color: #dd0000;
        font-size: 13px;
        font-weight: bold;
    }
</style>
