<template>
    <div class="d-song-list-wrapper" @scroll="handleScroll" ref="DSongListWrapper">
        <div class="d-song-list" ref="DSongList" v-show="showPage">
            <div class="tags-wrapper">
                <div class="current-tag">{{currentTag}}<span class="right">&gt;</span></div>
                <ul class="tags">
                    <li v-for="item in songListTags" class="tags-item" @click="selectItem(item)">{{item.name}}</li>
                </ul>
            </div>
            <ul class="song-list" v-show="showList">
                <li v-for="item in songList" class="sl-item">
                    <div class="img-wrapper">
                        <img v-lazy="item.coverImgUrl" class="img">
                        <div class="cover"></div>
                        <div class="author">
                            <i class="iconfont icon-yonghu"></i>
                            <p class="author-name">{{item.creator.nickname}}</p>
                        </div>
                    </div>
                    <p class="text">{{item.name}}</p>
                </li>
            </ul>
        </div>
        <load v-show="showLoad"></load>
        <continue-load v-show="showPage && showList && hasMore"></continue-load>
    </div>
</template>

<script>
    import Load from '../../base/load/Load'
    import ContinueLoad from '../../base/continue-load/ContinueLoad'
    import get from "../../common/js/api";
    import scrollToEnd from "../../common/js/scroll";

    const SINGLE_LOAD_COUNT = 30;
    let timer_1 = null,
        timer_2 = null;

    export default {
        name: "DSongList",
        data () {
            return {
                songListTags: [],
                songList: [],
                currentTag: '',
                canLoad: true,
                offset: 0,
                hasMore: false,
                showLoad: true,
                showPage: false,
                showList: true
            }
        },
        methods: {
            firstGet () {
                get('/playlist/hot').then((res) => {
                    this.songListTags = res.tags;
                    this.currentTag = this.songListTags[0].name;
                    this.getSongList();
                });
            },
            getSongList () {
                get('/top/playlist', {
                    cat: this.currentTag,
                    limit: SINGLE_LOAD_COUNT,
                    offset: this.offset
                }).then((res) => {
                    this.songList = this.songList.concat(res.playlists);
                    this.offset = this.songList.length;
                    this.hasMore = res.more;
                });
            },
            selectItem (item) {
                this.currentTag = item.name;
            },
            getMore () {
                this.canLoad = false;
                if (!this.hasMore) {
                    return;
                }
                clearTimeout(timer_1);
                timer_1 = setTimeout(() => {
                    this.canLoad = true;
                }, 1500);
                this.getSongList();
            },
            handleScroll () {
                scrollToEnd(this.$refs.DSongListWrapper, this.$refs.DSongList, this.getMore, this.canLoad);
            }
        },
        created () {
            this.firstGet();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showLoad = false;
                this.showPage = true;
            }, 2000);
        },
        watch: {
            currentTag (newTag, oldTag) {
                if (oldTag === '') {
                    return;
                }
                this.offset = 0;
                this.showLoad = true;
                this.showList = false;
                this.songList = [];
                this.getSongList();
                clearTimeout(timer_2);
                timer_2 = setTimeout(() => {
                    this.showLoad = false;
                    this.showList = true;
                }, 2000);
            }
        },
        components: {
            Load,
            ContinueLoad
        }
    }
</script>

<style scoped>
    .d-song-list-wrapper {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .d-song-list {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .tags-wrapper {
        margin-bottom: 35px;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .current-tag {
        padding: 2px 8px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #000;
        font-size: 13px;
        white-space: nowrap;
    }
    .current-tag .right {
        margin-left: 3px;
        color: #666;
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
    }
    .tags .tags-item {
        padding: 0 23px;
        border-right: 1px solid #ddd;
        height: 12px;
        line-height: 12px;
    }
    .tags .tags-item:last-child {
        border: none;
    }
    .song-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .sl-item {
        width: 18.4%;
        flex: 0 0 18.4%;
        margin-bottom: 30px;
    }
    .sl-item .img-wrapper {
        position: relative;
        font-size: 0;
        margin-bottom: 10px;
    }
    .sl-item .img-wrapper .img {
        width: 100%;
    }
    .sl-item .img-wrapper:hover .cover{
        opacity: 1;
    }
    .sl-item .img-wrapper .cover {
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
    .sl-item .img-wrapper .author {
        width: 100%;
        position: absolute;
        z-index: 2;
        left: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent , rgba(0,0,0,.6));
        color: #fff;
        display: flex;
        font-size: 12px;
        align-items: center;
        padding: 6px;
        box-sizing: border-box;
    }
    .sl-item .img-wrapper .author .iconfont {
        font-size: 12px;
        margin-right: 6px;
        vertical-align: middle;
        margin-bottom: -2px;
    }
    .sl-item .img-wrapper .author .author-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .sl-item .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
    }
</style>
