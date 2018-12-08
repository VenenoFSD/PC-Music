<template>
    <div class="search-song" v-show="show">
        <ul class="song-list" v-show="showList">
            <li class="sl-item" v-for="(item, index) in result" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <p class="song-name">{{item.name}}</p>
                <p class="artist-name">{{_artistsFormat(item.artists)}}</p>
                <p class="album-name">{{item.album.name}}</p>
                <p class="duration-time">{{_durationFormat(item.duration)}}</p>
                <p v-show="item.alias.length" class="alias">{{item.alias[0]}}</p>
                <span class="iconfont icon-bofang-2"></span>
            </li>
        </ul>
        <load v-show="showLoad"></load>
        <no-result v-show="NoResult"></no-result>
    </div>
</template>

<script>
    import get from '../../common/js/api'
    import {mapActions} from 'vuex'
    import {artistsFormat, durationFormat} from "../../common/js/dataFormat";
    import {searchMixin} from "../../common/js/mixin";

    export default {
        name: "SearchSongs",
        mixins: [searchMixin],
        props: {
            showResult: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            selectItem (song) {
                get('/song/detail', {
                    ids: song.id
                }).then((res) => {
                    this.insertSong(res.songs[0]);
                });
            },
            _getSearch (timer) {
                this.getSearch(timer, 1, 'songs', 'songCount');
            },
            _artistsFormat (artists) {
                return artistsFormat(artists);
            },
            _durationFormat (time) {
                return durationFormat(time);
            },
            ...mapActions([
                'insertSong'
            ])
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 0;
            },
            showResult (newShow) {
                this.show = newShow;
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
