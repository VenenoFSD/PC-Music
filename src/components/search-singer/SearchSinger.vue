<template>
    <div class="search-singer" v-show="show">
        <ul class="singer-list" v-show="showSinger">
            <li class="sl-item" v-for="(item, index) in artists" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <img :src="item.img1v1Url" class="img">
                <p class="name">{{item.name}}<span v-if="item.trans" class="trans">（{{item.trans}}）</span></p>
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

    let timer1 = null,
        timer2 = null;

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSinger",
        data () {
            return {
                show: false,
                artists: [],
                showLoad: true,
                showSinger: false,
                NoResult: false
            }
        },
        methods: {
            getSearchSinger (timer) {
                get('/search', {
                    keywords: this.query,
                    type: 100,
                    limit: DEFAULT_LIMIT
                }).then((res) => {
                    this.artists = res.result.artists;
                    this.NoResult = !res.result.artistCount;
                    if (!this.NoResult) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            this.showSinger = true;
                            this.showLoad = false;
                        }, 1500);
                    } else {
                        this.showLoad = false;
                    }
                });
            },
            selectItem (item) {
                this.setSinger(item);
                this.$router.push({
                    path: '/singer',
                    query: {
                        id: item.id
                    }
                });
            },
            _delayShow (timer) {
                this.showSinger = false;
                this.showLoad = true;
                this.getSearchSinger(timer);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
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
                this.show = newType.index === 2;
            },
            show (newShow) {
                if (newShow) {
                    this.NoResult = false;
                    this._delayShow(timer1);
                }
            },
            query (newQuery) {
                if (this.show && newQuery.length) {
                    this.NoResult = false;
                    this._delayShow(timer2);
                }
            }
        },
        components: {
            Load,
            NoResult
        }
    }
</script>

<style scoped>
    .singer-list {
        margin-top: 20px;
        font-size: 13px;
    }
    .sl-item {
        display: flex;
        align-items: center;
        padding: 10px;
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
        margin-right: 20px;
    }
    .trans {
        color: #999;
    }
</style>
