<template>
    <div class="search-album" v-show="show">
        <ul class="album-list" v-show="showAlbum">
            <li class="album-item" v-for="(item, index) in albums" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <div class="img-wrapper">
                    <img :src="item.picUrl">
                </div>
                <p class="album-name">{{item.name}}</p>
                <p class="artist">{{item.artist.name}}<span v-show="item.artist.alias.length">（{{item.artist.alias[0]}}）</span></p>
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
        name: "SearchAlbum",
        data () {
            return {
                show: false,
                albums: [],
                showLoad: true,
                showAlbum: false,
                NoResult: false
            }
        },
        methods: {
            getSearchAlbum (timer) {
                get('/search', {
                    keywords: this.query,
                    type: 10,
                    limit: DEFAULT_LIMIT
                }).then((res) => {
                    this.albums = res.result.albums;
                    this.NoResult = !res.result.albumCount;
                    if (!this.NoResult) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            this.showAlbum = true;
                            this.showLoad = false;
                        }, 1500);
                    } else {
                        this.showLoad = false;
                    }
                });
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
            _delayShow (timer) {
                this.showAlbum = false;
                this.showLoad = true;
                this.getSearchAlbum(timer);
            },
            ...mapMutations({
                setNewDisc: 'SET_NEW_DISC'
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
                this.show = newType.index === 1;
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
    .album-list {
        margin-top: 20px;
    }
    .album-item {
        display: flex;
        padding: 14px;
        align-items: center;
    }
    .album-item.bg {
        background-color: #f4f4f6;
    }
    .album-item:hover {
        background-color: #e8e8ea;
    }
    .img-wrapper {
        width: 59px;
        height: 50px;
        font-size: 0;
        background: url("./coverall.png") no-repeat 0 0;
        background-size: 100% 100%;
        flex: 0 0 59;
        margin-right: 20px;
    }
    .img-wrapper img {
        width: 50px;
        height: 50px;
    }
    .album-name {
        flex: 0 0 40%;
        font-size: 14px;
    }
    .artist {
        font-size: 12px;
        color: #999;
    }
</style>
