<template>
    <div class="search-song-list" v-show="show">
        <ul class="song-list" v-show="showList">
            <li class="sl-item" v-for="(item, index) in result" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <img :src="item.coverImgUrl" class="img">
                <p class="name">{{item.name}}</p>
                <p class="song-count">{{item.trackCount}}首</p>
                <p class="author">By {{item.creator.nickname}}</p>
                <p class="playCount">播放：{{_playCountFormat(item.playCount)}}</p>
            </li>
        </ul>
        <load v-show="showLoad"></load>
        <no-result v-show="NoResult"></no-result>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {playCountFormat} from "../../common/js/dataFormat";
    import {searchMixin} from "../../common/js/mixin";

    export default {
        name: "SearchSongList",
        mixins: [searchMixin],
        methods: {
            selectItem (item) {
                this.setSongList(item);
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: item.id
                    }
                });
            },
            _playCountFormat (playCount) {
                return playCountFormat(playCount);
            },
            _getSearch (timer) {
                this.getSearch(timer, 1000, 'playlists', 'playlistCount');
            },
            ...mapMutations({
                setSongList: 'SET_SONG_LIST'
            })
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 3;
            }
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
