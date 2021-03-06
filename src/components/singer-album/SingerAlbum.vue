<template>
    <div class="singer-album" @scroll="handleScroll" ref="singerAlbum">
        <ul class="singer-album-list" ref="singerAlbumList">
            <li v-for="item in album" class="sb-item" @click="selectItem(item)">
                <div class="img-wrapper">
                    <img v-lazy="item.picUrl" class="img">
                    <div class="cover"></div>
                </div>
                <div class="desc">
                    <p class="name">{{item.name}}<span v-if="item.alias.length">（{{item.alias[0]}}）</span></p>
                    <p class="time">{{_timeFormat(item.publishTime)}}</p>
                </div>
            </li>
            <li class="empty"></li>
            <li class="empty"></li>
            <li class="empty"></li>
            <li class="empty"></li>
        </ul>
        <p v-show="album && !album.length" class="no-album">暂无该歌手的专辑</p>
        <continue-load v-show="album.length && hasMore"></continue-load>
    </div>
</template>

<script>
    import get from "../../common/js/api";
    import scrollToEnd from "../../common/js/scroll";
    import ContinueLoad from '../../base/continue-load/ContinueLoad'
    import {timeFormat} from "../../common/js/dataFormat";
    import {mapMutations} from 'vuex'

    export default {
        name: "SingerAlbum",
        data () {
            return {
                hadLoad: false,
                album: [],
                hasMore: true,
                offset: 0
            }
        },
        props: {
            currentSelect: {
                type: String,
                default: ''
            },
            singerId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            getSingerDesc () {
                if (!this.hasMore) {
                    return;
                }
                get('/artist/album', {
                    id: this.singerId,
                    limit: 48,
                    offset: this.offset
                }).then((res) => {
                    this.album = this.album.concat(res.hotAlbums);
                    this.hasMore = res.more;
                    this.offset = this.album.length;
                });
            },
            handleScroll () {
                scrollToEnd(this.$refs.singerAlbum, this.$refs.singerAlbumList, this.getSingerDesc);
            },
            selectItem (item) {
                this.setNewDisc(item);
                this.$router.push({
                    path: '/album',
                    query: {
                        id: item.id
                    }
                });
            },
            _timeFormat (time) {
                return timeFormat(time);
            },
            ...mapMutations({
                setNewDisc: 'SET_NEW_DISC'
            })
        },
        watch: {
            currentSelect (newSelect) {
                if (newSelect === 'album' && !this.hadLoad) {
                    this.hadLoad = true;
                    this.getSingerDesc();
                }
            }
        },
        components: {
            ContinueLoad
        }
    }
</script>

<style scoped>
    .singer-album {
        padding: 30px 26px 0 30px;
        overflow: auto;
    }
    .singer-album-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .sb-item {
        width: 14.3%;
        flex: 0 0 14.3%;
        margin-bottom: 30px;
    }
    .empty {
        width: 14.3%;
        height: 0;
    }
    .img-wrapper {
        font-size: 0;
        background: url("./coverall.png") no-repeat 0 0;
        background-size: 100% 100%;
        margin-bottom: 6px;
        position: relative;
    }
    .img-wrapper .img {
        width: 84.1%;
    }
    .sb-item:hover .img-wrapper .cover {
        opacity: 1;
    }
    .img-wrapper .cover {
        width: 84.1%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        transition: opacity 0.6s;
    }
    .desc .name,  .desc .time{
        width: 86%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .desc .name {
        font-size: 15px;
    }
    .desc .time {
        margin-top: 2px;
        font-size: 12px;
        color: #aaa;
    }
    .no-album {
        text-align: center;
        font-size: 16px;
        color: #aaa;
        margin-top: 100px;
    }
</style>
