<template>
    <div class="search-song-list" v-show="show">
        <ul class="song-list" v-show="showSongList">
            <li class="sl-item" v-for="(item, index) in songLists" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <img :src="item.coverImgUrl" class="img">
                <p class="name">{{item.name}}</p>
                <p class="song-count">{{item.trackCount}}首</p>
                <p class="author">By {{item.creator.nickname}}</p>
                <p class="playCount">播放：{{playCountFormat(item.playCount)}}</p>
            </li>
        </ul>
        <load v-show="showLoad"></load>
        <no-result v-show="NoResult"></no-result>
    </div>
</template>

<script>
    import get from '../../common/js/api'
    import Load from '../../base/load/Load'
    import NoResult from '../../base/no-result/NoResult'
    import {mapMutations} from 'vuex'
    import {debounce} from "../../common/js/util";

    let timer1 = null,
        timer2 = null;

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSongList",
        data () {
            return {
                show: false,
                songLists: [],
                showLoad: true,
                showSongList: false,
                NoResult: false
            }
        },
        methods: {
            getSearchSongList (timer) {
                get('/search', {
                    keywords: this.query,
                    type: 1000,
                    limit: DEFAULT_LIMIT
                }).then((res) => {
                    this.songLists = res.result.playlists;
                    this.NoResult = !res.result.playlistCount;
                    if (!this.NoResult) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            this.showSongList = true;
                            this.showLoad = false;
                        }, 1500);
                    } else {
                        this.showLoad = false;
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
            selectItem (item) {
                this.setSongList(item);
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: item.id,
                        title: '歌单'
                    }
                });
            },
            _delayShow (timer) {
                this.showSongList = false;
                this.showLoad = true;
                this.getSearchSongList(timer);
            },
            ...mapMutations({
                setSongList: 'SET_SONG_LIST'
            })
        },
        props: {
            currentType: {
                type: Object,
                default: {
                    index: 0,
                    code: 1
                }
            },
            query: {
                type: String,
                default: ''
            }
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 3;
            },
            show (newShow) {
                if (newShow) {
                    this.NoResult = false;
                    this._delayShow(timer1);
                }
            }
        },
        created () {
            this.$watch('query', debounce((newQuery) => {
                if (this.show && newQuery.length) {
                    this.NoResult = false;
                    this._delayShow(timer2);
                }
            }, 300));
        },
        components: {
            Load,
            NoResult
        }
    }
</script>

<style scoped>
    .song-list {
        margin-top: 20px;
        font-size: 13px;
    }
    .sl-item {
        display: flex;
        align-items: center;
        padding: 10px;
        font-size: 13px;
        color: #999;
    }
    .sl-item.bg {
        background-color: #f4f4f6;
    }
    .sl-item:hover {
        background-color: #e8e8ea;
    }
    .img {
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        margin-right: 10px;
    }
    .name {
        color: #000;
        flex:  0 0 calc(50% - 60px);
    }
    .song-count {
        flex: 0 0 15%;
    }
    .author {
        flex: 0 0 20%;
    }
    .playCount {
        flex: 0 0 15%;
    }
</style>
