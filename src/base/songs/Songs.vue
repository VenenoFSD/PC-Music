<template>
    <div class="songs-wrapper" v-if="songs.length">
        <div class="play" @click="playAll"><i class="iconfont icon-bofang-2"></i>播放全部({{songs.length}})</div>
        <ul class="song-list">
            <li v-for="(item, index) in songs" class="s-item" :class="{'bg': isOdd(index)}">
                <p class="num">{{_rankFormat(index)}}</p>
                <p class="song-name">{{item.name}}<span class="song-alia" v-if="item.alia && item.alia.length">（{{item.alia[0]}}）</span></p>
                <p class="play-wrapper"><span class="iconfont icon-bofang-2" @click="selectItem(item, index)"></span></p>
                <p class="artist-name">{{_artistsFormat(item.ar)}}</p>
                <p class="album-name">{{item.al.name}}</p>
                <p class="song-duration">{{_durationFormat(item.dt)}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {artistsFormat, durationFormat, rankFormat} from "../../common/js/dataFormat";

    export default {
        name: "Songs",
        props: {
            songs: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            isOdd (index) {
                return (index + 1) % 2;
            },
            selectItem (item, index) {
                this.$emit('select', item, index);
            },
            playAll () {
                this.$emit('playAll');
            },
            _rankFormat (index) {
                return rankFormat(index);
            },
            _artistsFormat (artists) {
                return artistsFormat(artists);
            },
            _durationFormat (time) {
                return durationFormat(time);
            }
        }
    }
</script>

<style scoped>
    .songs-wrapper {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .song-list {
        padding: 0 calc(241px + 100% - 100vw) 0 30px;
    }
    .play {
        margin-left: 30px;
        padding: 14px 0;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #000;
        width: 130px;
    }
    .play .iconfont {
        color: #ec0000;
        font-size: 20px;
        margin-right: 4px;
    }
    .s-item {
        line-height: 45px;
        font-size: 12px;
        color: #999;
        display: flex;
        padding: 0 20px 0 8px;
    }
    .s-item.bg {
        background-color: #f4f4f6;
    }
    .s-item:hover {
        background-color: #e8e8ea;
    }
    .s-item .num {
        color: #000;
        width: 20px;
        flex: 0 0 20px;
        margin-right: 24px;
    }
    .s-item .song-name {
        font-size: 14px;
        color: #000;
        flex: 0 0 calc(42% - 44px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .song-name .song-alia {
        color: #aaa;
    }
    .s-item .play-wrapper {
        flex: 0 0 54px;
        display: flex;
        align-items: center;
        padding: 0 20px 0 10px;
        box-sizing: border-box;
    }
    .s-item .play-wrapper .iconfont {
        font-size: 24px;
        color: #888;
        display: none;
    }
    .s-item:hover .play-wrapper .iconfont {
        display: inline-block;
    }
    .s-item .artist-name {
        flex: 0 0 calc(24% - 54px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .album-name {
        flex: 0 0 calc(29% - 20px);
        margin-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .song-duration {
        flex: 0 0 5%;
    }
</style>
