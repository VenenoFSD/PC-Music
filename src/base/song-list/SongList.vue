<template>
    <div class="song-list-wrapper">
        <ul class="song-list" v-show="showList">
            <li v-for="item in songList" class="sl-item">
                <div class="img-wrapper">
                    <img :src="item.coverImgUrl" class="img">
                    <div class="cover"></div>
                    <div class="author">
                        <i class="iconfont icon-yonghu"></i>
                        <p class="author-name">{{item.creator.nickname}}</p>
                    </div>
                </div>
                <p class="text">{{item.name}}</p>
            </li>
        </ul>
        <load v-show="showLoad"></load>
    </div>
</template>

<script>
    import axios from 'axios'
    import Load from '../../base/load/Load'
    const SINGLE_LOAD_COUNT = 25;
    export default {
        name: "SongList",
        data () {
            return {
                hasMore: false,
                offset: 0,
                songList: [],
                showLoad: true,
                showList: false
            }
        },
        props: {
            currentTag: {
                type: String,
                default: ''
            }
        },
        methods: {
            firstGet () {
                if (this.currentTag === '') {
                    return;
                }
                this._dataInit();
                this.getSongList();
            },
            getMore () {
                if (!this.hasMore) {
                    return;
                }
                this.getSongList();
            },
            getSongList () {
                axios.get(`http://localhost:3000/top/playlist?cat=${this.currentTag}&limit=${SINGLE_LOAD_COUNT}&offset=${this.offset}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.hasMore = res.data.more;
                        this.songList = this.songList.concat(res.data.playlists);
                        this.offset = this.songList.length;
                    }
                });
            },
            delayLoad () {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.showLoad = false;
                    this.showList = true;
                }, 2500);
            },
            _dataInit () {
                this.hasMore = false;
                this.offset = 0;
                this.songList = [];
                this.showLoad = true;
                this.showList = false;
            }
        },
        created () {
            this.firstGet();
            this.delayLoad();
        },
        watch: {
            currentTag () {
                this.firstGet();
                this.delayLoad();
            }
        },
        components: {
            Load
        }
    }
</script>

<style scoped>
    .song-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .sl-item {
        width: 18.3%;
        flex: 0 0 18.3%;
        margin-bottom: 40px;
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
