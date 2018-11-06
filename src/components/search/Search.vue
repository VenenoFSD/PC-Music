<template>
    <div class="search">
        <div class="input-wrapper">
            <input type="text" placeholder="搜索音乐、歌手、歌词、用户" class="input" v-model="query" @keyup.enter="showSearchResult">
            <span class="clear-btn" v-show="query" @click="clearQuery">
                <i class="iconfont icon-shanchu"></i>
            </span>
            <span class="search-btn" @click="showSearchResult">
                <i class="iconfont icon-sousuo"></i>
            </span>
        </div>
        <div class="search-box" v-show="!searchSuggest && !showResult">
            <div class="hot">
                <h2 class="title">热门搜索</h2>
                <separate></separate>
                <ul>
                    <li v-for="item in hots" class="hot-item" @click="setQuery(item.first)">{{item.first}}</li>
                </ul>
            </div>
            <div class="search-history">
                <h2 class="title">搜索历史<span class="clear" @click="showConfirm"><i class="iconfont icon-iconfontshanchu1"></i></span></h2>
                <separate></separate>
                <ul class="sh-list">
                    <li class="sh-item" v-for="item in searchHistory" @click="setQuery(item)">{{item}}<span class="delete" @click.stop="deleteSearchHistory(item)"><i class="iconfont icon-shanchu"></i></span></li>
                </ul>
                <no-result text="暂无搜索历史" v-show="!searchHistory.length"></no-result>
            </div>
        </div>
        <div class="search-suggest" v-if="searchSuggest && !showResult">
            <p class="search-text" @click="showSearchResult">搜索“{{query}}”</p>
            <div v-if="showSuggest">
                <h2 class="suggest-title" v-if="searchSuggest.songs"><i class="iconfont icon-yinle"></i>单曲</h2>
                <ul>
                    <li v-for="item in searchSuggest.songs" class="suggest-item" @click="selectSong(item)">~ {{item.name}}</li>
                </ul>
                <h2 class="suggest-title" v-if="searchSuggest.artists"><i class="iconfont icon-yonghu"></i>歌手</h2>
                <ul>
                    <li v-for="item in searchSuggest.artists" class="suggest-item" @click="selectSinger(item)">~ {{item.name}}</li>
                </ul>
            </div>
            <p class="no-suggest" v-show="!showSuggest">无搜索建议</p>
        </div>
        <div class="search-result" v-show="showResult" ref="searchResult">
            <div class="st-list-wrapper">
                <ul class="st-list">
                    <li v-for="(item, index) in searchType" class="st-item" :class="{'current': index === currentType.index}" @click="selectItem(index)">{{item.name}}</li>
                </ul>
            </div>
            <search-song :currentType="currentType" :query="query" :showResult="showResult"></search-song>
            <search-album :currentType="currentType" :query="query"></search-album>
            <search-singer :currentType="currentType" :query="query"></search-singer>
            <search-song-list :currentType="currentType" :query="query"></search-song-list>
        </div>
        <confirm ref="confirm" @confirm="clearSearchHistory"></confirm>
        <router-view></router-view>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import Confirm from '../../base/confirm/Confirm'
    import SearchSong from '../search-song/SearchSong'
    import SearchAlbum from '../search-album/SearchAlbum'
    import SearchSinger from '../search-singer/SearchSinger'
    import SearchSongList from '../search-song-list/SearchSongList'
    import NoResult from '../../base/no-result/NoResult'
    import get from "../../common/js/api";
    import {mapMutations, mapActions, mapGetters} from 'vuex'
    import {playlistMixin} from "../../common/js/mixin";
    import {debounce} from "../../common/js/util";

    export default {
        name: "Search",
        mixins: [playlistMixin],
        data () {
            return {
                hots: [],
                query: '',
                searchSuggest: null,
                showSuggest: false,
                showResult: false,
                searchType: [
                    {name: '单曲', code: 1},
                    {name: '专辑', code: 10},
                    {name: '歌手', code: 100},
                    {name: '歌单', code: 1000}
                ],
                currentType: {
                    index: 0,
                    code: 1
                }
            }
        },
        methods: {
            getHotSearch () {
                get('/search/hot').then((res) => {
                    this.hots = res.result.hots;
                });
            },
            getSearchSuggest (newQuery) {
                get('/search/suggest', {
                    keywords: newQuery
                }).then((res) => {
                    this.searchSuggest = res.result;
                    this.showSuggest = !this._isEmptyObject(this.searchSuggest);
                });
            },
            setQuery(query) {
                this.query = query;
            },
            clearQuery () {
                this.query = '';
            },
            selectSinger (item) {
                this.setSinger(item);
                this.$router.push(`/search/${item.id}`);
                this.saveSearchHistory(item.name);
            },
            showSearchResult () {
                if (!this.query.length) {
                    return;
                }
                this.showResult = true;
                this.saveSearchHistory(this.query);
            },
            selectItem (index) {
                this.currentType = {
                    index,
                    code: this.searchType[index].code
                };
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.searchResult.style.bottom = bottom;
            },
            selectSong (song) {
                get('/song/detail', {
                    ids: song.id
                }).then((res) => {
                    this.insertSong(res.songs[0]);
                });
                this.saveSearchHistory(song.name);
            },
            clearHistory () {
                if (!this.searchHistory.length) {
                    return;
                }
                this.clearSearchHistory();
            },
            showConfirm () {
                this.$refs.confirm.show();
            },
            _isEmptyObject (obj) {
                for (let item in obj) {
                    return false;
                }
                return true;
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            ...mapActions([
                'insertSong',
                'saveSearchHistory',
                'deleteSearchHistory',
                'clearSearchHistory'
            ])
        },
        created () {
            this.getHotSearch();
            this.$watch('query', debounce((newQuery) => {
                if (newQuery === '') {
                    this.searchSuggest = null;
                    this.showResult = false;
                    return;
                }
                if (!this.showResult) {
                    this.getSearchSuggest(newQuery);
                }
            }, 300));
        },
        watch: {
            showResult (newShow) {
                if (!newShow) {
                    this.currentType = {
                        index: 0,
                        code: 1
                    };
                }
            }
        },
        computed: {
            ...mapGetters([
                'searchHistory'
            ])
        },
        components: {
            Separate,
            Confirm,
            SearchSong,
            SearchAlbum,
            SearchSinger,
            SearchSongList,
            NoResult
        }
    }
</script>

<style scoped>
    .search {
        padding: 24px 30px 0 30px;
        box-sizing: border-box;
        background-color: #fafafc;
        color: #222222;
        height: 100%;
        position: relative;
    }
    .input-wrapper {
        position: relative;
    }
    .input-wrapper .input {
        width: 100%;
        line-height: 46px;
        border: 1px solid #ddd;
        padding-left: 16px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .input-wrapper .input::placeholder {
        color: #ccc;
    }
    .input-wrapper .clear-btn {
        position: absolute;
        right: 50px;
        top: 14px;
    }
    .input-wrapper .search-btn {
        position: absolute;
        right: 20px;
        top: 14px;
    }
    .input-wrapper .search-btn .iconfont {
        font-size: 18px;
        color: #bbb;
    }
    .search-box {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
    }
    .hot, .search-history {
        flex: 0 0 48%;
    }
    .search-box .title {
        font-size: 15px;
        margin-bottom: 12px;
    }
    .search-box .hot-item {
        float: left;
        border: 1px solid #ccc;
        padding: 3px 10px;
        border-radius: 40px;
        margin: 20px 10px 0 0;
    }
    .search-history .clear {
        float: right;
    }
    .search-history .clear .iconfont {
        font-size: 20px;
        color: #999;
    }
    .search-history .sh-list {
        padding-top: 10px;
    }
    .search-history .sh-item {
        line-height: 40px;
        font-size: 14px;
        color: #444;
    }
    .search-history .sh-item .delete {
        float: right;
    }
    .search-history .sh-item .delete .iconfont {
        color: #999;
    }
    .search-suggest {
        border: 1px solid #ddd;
        background-color: #fff;
        line-height: 40px;
    }
    .search-text {
        color: rgb(27, 103, 170);
        font-size: 15px;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
    }
    .suggest-title {
        font-size: 14px;
    }
    .suggest-title {
        margin: 0 20px;
        border-bottom: 1px solid #eee;
    }
    .suggest-title .iconfont {
        margin-right: 8px;
        color: #ec0000;
    }
    .suggest-item {
        padding-left: 30px;
        box-sizing: border-box;
    }
    .search-text:hover, .suggest-item:hover {
        background-color: #eee;
    }
    .no-suggest {
        text-align: center;
        font-size: 15px;
    }
    .search-result {
        position: fixed;
        left: 210px;
        right: 0;
        top: 90px;
        bottom: 0;
        padding: 0 30px;
        box-sizing: border-box;
        overflow: auto;
    }
    .st-list-wrapper {
        border-bottom: 1px solid #ddd;
    }
    .st-list {
        display: flex;
        width: 240px;
        justify-content: space-between;
    }
    .st-list .st-item {
        line-height: 40px;
        font-size: 15px;
    }
    .st-list .st-item.current {
        color: #d62f2f;
        border-bottom: 2px solid #d62f2f;
    }
</style>
