<template>
    <div class="search-result">
        <div class="st-list-wrapper">
            <ul class="st-list">
                <li v-for="(item, index) in searchType" class="st-item" :class="{'current': index === currentType.index}" @click="selectItem(index)">{{item.name}}</li>
            </ul>
        </div>
        <search-song v-show="currentType.index === 0" :songs="searchResult.songs"></search-song>
        <search-album v-show="currentType.index === 1"></search-album>
        <search-singer v-show="currentType.index === 2"></search-singer>
        <search-song-list v-show="currentType.index === 3"></search-song-list>
    </div>
</template>

<script>
    import SearchSong from '../search-song/SearchSong'
    import SearchAlbum from '../search-album/SearchAlbum'
    import SearchSinger from '../search-singer/SearchSinger'
    import SearchSongList from '../search-song-list/SearchSongList'
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;

    export default {
        name: "SearchResult",
        data () {
            return {
                searchType: [
                    {name: '单曲', code: 1},
                    {name: '专辑', code: 10},
                    {name: '歌手', code: 100},
                    {name: '歌单', code: 1000}
                ],
                currentType: {
                    index: 0,
                    code: 1
                },
                searchResult: {}
            }
        },
        methods: {
            selectItem (index) {
                this.currentType = {
                    index,
                    code: this.searchType[index].code
                };
            },
            getSearchResult () {
                get('/search', {
                    keywords: this.query,
                    type: this.currentType.code,
                    limit: DEFAULT_LIMIT
                }).then((res) => {
                    this.searchResult = res.result;
                    console.log(this.searchResult);
                });
            }
        },
        props: {
            query: {
                type: String,
                default: ''
            },
            hasShow: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            query () {
                if (!this.hasShow) {
                    return;
                }
                this.getSearchResult();
            },
            hasShow (newShow) {
                if (!newShow) {
                    this.currentType = { index: 0, code: 1 };
                    return;
                }
                this.getSearchResult();
            }
        },
        components: {
            SearchSong,
            SearchAlbum,
            SearchSinger,
            SearchSongList
        }
    }
</script>

<style scoped>
    .search-result {
        position: fixed;
        left: 210px;
        top: 72px;
        right: 0;
        bottom: 0;
        z-index: 4;
        background-color: #fafafc;
        border-left: 1px solid #ddd;
        padding: 20px 30px 0 30px;
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
