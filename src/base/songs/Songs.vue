<template>
    <div class="songs-wrapper" v-if="songs.length">
        <div class="play"><span class="iconfont icon-play"></span>播放全部(50)</div>
        <ul>
            <li v-for="(item, index) in songs" class="s-item" :class="{'bg': isOdd(index)}">
                <span class="num">{{numFormat(index)}}</span>
                <span class="song-name">{{item.name}}</span>
                <span class="artist-name">{{artistsFormat(item.ar)}}</span>
                <span class="album-name">{{item.al.name}}</span>
                <span class="song-duration">{{durationFormat(item.dt)}}</span>
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
        width: 110px;
    }
    .play .iconfont {
        color: #ec0000;
        font-size: 12px;
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #ec0000;
        padding: 1px 0 0 2px;
        box-sizing: border-box;
        margin-right: 6px;
    }
    .s-item {
        line-height: 45px;
        font-size: 12px;
        color: #999;
        display: flex;
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
        margin: 0 24px 0 8px;
    }
    .s-item .song-name {
        font-size: 14px;
        color: #000;
        flex: 0 0 40%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .artist-name {
        flex: 0 0 18%;
    }
    .s-item .album-name {
        flex: 0 0 32%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .s-item .song-duration {
        flex: 0 0 26px;
    }
</style>
