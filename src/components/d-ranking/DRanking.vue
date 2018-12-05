<template>
    <div class="d-ranking-wrapper">
        <div class="d-ranking" v-show="showContent">
            <div class="official-ranking">
                <h2 class="title">官方榜</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="item in officialList" class="l-item" @click="selectItem(item)">
                        <div class="img-wrapper">
                            <img :src="item.coverImgUrl" class="img">
                            <div class="update-time">{{item.updateFrequency}}</div>
                            <div class="cover"></div>
                        </div>
                        <div class="ranking">
                            <p class="ranking-text" v-for="(rItem, index) in item.tracks">{{index + 1}}. {{rItem.first}} - {{rItem.second}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="global-ranking">
                <h2 class="title">全球榜</h2>
                <separate></separate>
                <ul class="list">
                    <li v-for="item in globalList" class="l-item" @click="selectItem(item)">
                        <div class="img-wrapper">
                            <img :src="item.coverImgUrl" class="img">
                            <div class="update-time">{{item.updateFrequency}}</div>
                            <div class="cover"></div>
                        </div>
                        <div class="ranking">
                            <p class="ranking-text" v-for="(rItem, index) in item.tracks">{{index + 1}}. {{rItem.first}} - {{rItem.second}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <load v-show="showLoad"></load>
        <router-view></router-view>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import Load from '../../base/load/Load'
    import get from '../../common/js/api'
    import {mapMutations} from 'vuex'
    import {delayShowMixin} from "../../common/js/mixin";

    export default {
        name: "DRanking",
        mixins: [delayShowMixin],
        data () {
            return {
                officialList: [],
                globalList: []
            }
        },
        methods: {
            getRankingList () {
                get('/toplist/detail').then((res) => {
                    this.officialList = res.list.slice(0, 4);
                    this.globalList = res.list.slice(4);
                });
            },
            selectItem (item) {
                this.$router.push({
                    path: `/discovery/ranking/${item.id}`,
                    query: {
                        title: '排行榜'
                    }
                });
                this.setSongList(item);
            },
            ...mapMutations({
                setSongList: 'SET_SONG_LIST'
            })
        },
        created () {
            this.delayShow(this.getRankingList, 2000);
        },
        components: {
            Separate,
            Load
        }
    }
</script>

<style scoped>
    .d-ranking-wrapper {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .d-ranking {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .global-ranking {
        margin-top: 40px;
    }
    .title {
        font-size: 16px;
        color: #000;
        margin-bottom: 16px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 10px;
    }
    .l-item {
        width: 48.6%;
        flex: 0 0 48.6%;
        display: flex;
        align-items: center;
        border: 1px solid #e4e4e4;
        background-color: #fff;
        margin-bottom: 14px;
    }
    .l-item:hover .img-wrapper .cover {
        opacity: 1;
    }
    .img-wrapper {
        position: relative;
        font-size: 0;
        margin-right: 16px;
    }
    .img-wrapper .cover {
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
    .img-wrapper .update-time {
        width: 100%;
        font-size: 12px;
        color: #fff;
        padding: 6px;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        background: linear-gradient(to bottom, transparent , rgba(0,0,0,.4));
    }
    .img-wrapper .img {
        height: 120px;
    }
    .ranking {
        flex: 1;
        overflow: hidden;
    }
    .ranking .ranking-text {
        margin: 6px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
