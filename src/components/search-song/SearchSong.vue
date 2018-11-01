<template>
    <div class="search-song" v-show="show">
        <ul class="song-list">
            <li class="sl-item" v-for="(item, index) in songs" :class="{'bg': !(index % 2)}">
                <p class="song-name">{{item.name}}</p>
                <p class="artist-name">{{artistsFormat(item.artists)}}</p>
                <p class="album-name">{{item.album.name}}</p>
                <p class="duration-time">{{durationFormat(item.duration)}}</p>
                <p v-show="item.alias.length" class="alias">{{item.alias[0]}}</p>
                <span class="iconfont icon-bofang-2"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSongs",
        data () {
            return {
                show: false,
                songs: []
            }
        },
        methods: {
            getSearchSong () {
                get('/search', {
                    keywords: this.query,
                    type: 1,
                    limit: DEFAULT_LIMIT
                }).then((res) => {
                    this.songs = res.result.songs;
                });
            },
            artistsFormat (artists) {
                let arr = [];
                for (let i = 0; i < artists.length; i++) {
                    arr.push(artists[i].name);
                }
                return arr.join('/');
            },
            durationFormat (time) {
                time = time / 1000 | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            }
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
            },
            showResult: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 0;
            },
            showResult (newShow) {
                this.show = newShow;
            },
            show (newShow) {
                if (newShow && this.query.length) {
                    this.getSearchSong();
                }
            },
            query (newQuery) {
                if (this.show && newQuery.length) {
                    this.getSearchSong();
                }
            }
        }
    }
</script>

<style scoped>
    .sl-item {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 10px 20px;
        box-sizing: border-box;
        line-height: 30px;
        font-size: 12px;
        color: #999;
        position: relative;
    }
    .sl-item:first-child {
        margin-top: 30px;
    }
    .sl-item.bg {
        background-color: #f4f4f6;
    }
    .sl-item:hover {
        background-color: #e8e8ea;
    }
    .sl-item:hover .iconfont {
        display: block;
    }
    .sl-item .iconfont {
        position: absolute;
        left: calc(35% - 30px);
        font-size: 22px;
        top: 13px;
        display: none;
    }
    .song-name {
        font-size: 13px;
        color: #000;
        flex: 0 0 calc(35% - 50px);
        margin-right: 50px;
    }
    .artist-name {
        color: rgb(26, 90, 153);
        flex: 0 0 30%;
    }
    .album-name {
        flex: 0 0 30%;
    }
    .duration-time {
        flex: 0 0 5%;
    }
    .alias {
        flex: 0 0 100%;
    }
    .song-name, .artist-name, .album-name, .duration-time, .alias {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

</style>
