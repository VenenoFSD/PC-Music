<template>
    <div class="songs-wrapper" v-if="songs.length">
        <div class="play"><i class="iconfont icon-bofang-2"></i>播放全部(50)</div>
        <ul>
            <li v-for="(item, index) in songs" class="s-item" :class="{'bg': isOdd(index)}">
                <p class="num">{{numFormat(index)}}</p>
                <p class="song-name">{{item.name}}<span class="song-alia" v-if="item.alia.length">（{{item.alia[0]}}）</span></p>
                <p class="play-wrapper"><span class="iconfont icon-bofang-2"></span></p>
                <p class="artist-name">{{artistsFormat(item.ar)}}</p>
                <p class="album-name">{{item.al.name}}</p>
                <p class="song-duration">{{durationFormat(item.dt)}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Songs",
        props: {
            songs: {
                type: Array,
                default: []
            }
        },
        methods: {
            numFormat (index) {
                return index < 9 ? '0' + (index + 1) : index + 1;
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
            isOdd (index) {
                return (index + 1) % 2;
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            }
        }
    }
</script>

<style scoped>
    .songs-wrapper {
        padding: 0 26px 0 30px;
        overflow: auto;
    }
    .play {
        padding: 14px 0;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #000;
        width: 120px;
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
        flex: 0 0 38%;
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
        flex: 0 0 18%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .album-name {
        flex: 0 0 30%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .song-duration {
        flex: 0 0 26px;
    }
</style>
