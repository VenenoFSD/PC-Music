<template>
    <div class="search">
        <div class="input-wrapper">
            <input type="text" placeholder="搜索音乐、歌手、歌词、用户" class="input" v-model="query" @focus="focusChange(true)" @blur="focusChange(false)">
            <span class="clear-btn" v-show="query" @click="clearQuery">
                <i class="iconfont icon-shanchu"></i>
            </span>
            <span class="search-btn">
                <i class="iconfont icon-sousuo"></i>
            </span>
        </div>
        <div class="search-box" v-show="!searchSuggest || !isFocus">
            <div class="hot">
                <h2 class="title">热门搜索</h2>
                <separate></separate>
                <ul>
                    <li v-for="item in hots" class="hot-item" @click="setQuery(item.first)">{{item.first}}</li>
                </ul>
            </div>
            <div class="search-history">
                <h2 class="title">搜索历史<span class="clear"><i class="iconfont icon-iconfontshanchu1"></i></span></h2>
                <separate></separate>
                <ul class="sh-list">
                    <!--<li class="sh-item"><span class="delete"><i class="iconfont icon-shanchu"></i></span></li>-->
                </ul>
            </div>
        </div>
        <div class="search-suggest" v-if="searchSuggest && isFocus">
            <p class="search-text">搜索“{{query}}”</p>
            <div v-if="showSuggest">
                <h2 class="suggest-title"><i class="iconfont icon-yinle"></i>单曲</h2>
                <ul>
                    <li v-for="item in searchSuggest.songs" class="suggest-item">~ {{item.name}}</li>
                </ul>
                <h2 class="suggest-title"><i class="iconfont icon-yonghu"></i>歌手</h2>
                <ul>
                    <li v-for="item in searchSuggest.artists" class="suggest-item">~ {{item.name}}</li>
                </ul>
            </div>
            <p class="no-suggest" v-show="!showSuggest">无搜索建议</p>
        </div>
        <confirm></confirm>
        <!--<search-result :query="query"></search-result>-->
        <router-view></router-view>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import Confirm from '../../base/confirm/Confirm'
    import SearchResult from '../search-result/SearchResult'
    import get from "../../common/js/api";

    export default {
        name: "Search",
        data () {
            return {
                hots: [],
                query: '',
                searchSuggest: null,
                isFocus: false,
                showSuggest: false
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
            focusChange (bool) {
                this.isFocus = bool;
            },
            _isEmptyObject (obj) {
                for (let item in obj) {
                    return false;
                }
                return true;
            },
        },
        created () {
            this.getHotSearch();
        },
        watch: {
            query (newQuery) {
                if (newQuery === '') {
                    this.searchSuggest = null;
                    return;
                }
                this.getSearchSuggest(newQuery);
            }
        },
        components: {
            Separate,
            Confirm,
            SearchResult
        }
    }
</script>

<style scoped>
    .search {
        padding: 24px 30px 0 30px;
        box-sizing: border-box;
        background-color: #fafafc;
        color: #222222;
        height: 100vh;
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
    }
    .suggest-title {
        font-size: 14px;
    }
    .search-text, .suggest-title {
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
</style>
