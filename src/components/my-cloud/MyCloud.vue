<template>
    <div class="my-cloud" ref="myCloud">
        <div class="header">
            <h2 class="title">我的音乐云盘：{{capacity.currentSize}}G/{{capacity.maxSize}}G</h2>
            <div class="size-box">
                <div class="current-size" ref="currentSize"></div>
            </div>
        </div>
        <songs :songs="cloudSong" @select="selectSong" @playAll="playAll"></songs>
    </div>
</template>

<script>
    import Songs from '../../base/songs/Songs'
    import {playlistMixin} from "../../common/js/mixin";
    import {mapActions} from 'vuex'
    import get from '../../common/js/api'

    export default {
        name: "MyCloud",
        mixins: [playlistMixin],
        data () {
            return {
                cloudSong: [],
                capacity: {
                    currentSize: 0,
                    maxSize: 0
                }
            }
        },
        methods: {
            getMyCloud () {
                get('/user/cloud').then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        this.cloudSong.push(res.data[i].simpleSong);
                    }
                    this._sizeFormat(res.size, res.maxSize);
                });
            },
            handlePlaylist (playlist) {
                const bottom = playlist.length ? '61px' : '0';
                this.$refs.myCloud.style.bottom = bottom;
            },
            selectSong (song, index) {
                this.selectPlay({
                    list: this.cloudSong,
                    index
                });
            },
            playAll () {
                this.sequencePlay({
                    list: this.cloudSong
                });
            },
            _sizeFormat (size, maxSize) {
                this.capacity.currentSize = (size / 1024 / 1024 / 1024).toFixed(1);
                this.capacity.maxSize = maxSize / 1024 / 1024 / 1024;
                this.$refs.currentSize.style.width = this.capacity.currentSize / this.capacity.maxSize * 160 + 'px';
            },
            ...mapActions([
                'selectPlay',
                'sequencePlay'
            ])
        },
        created () {
            this.getMyCloud();
        },
        components: {
            Songs
        }
    }
</script>

<style scoped>
    .my-cloud {
        position: fixed;
        left: 210px;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: auto;
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        background-color: #fafafc;
    }
    .header {
        display: flex;
        align-items: center;
        margin: 0 30px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }
    .my-cloud .title {
        font-size: 13px;
        color: #444;
        margin-right: 6px;
    }
    .size-box {
        width: 160px;
        height: 6px;
        border-radius: 10px;
        background-color: #ddd;
        position: relative;
        overflow: hidden;
    }
    .current-size {
        position: absolute;
        left: 0;
        top: 0;
        height: 6px;
        background-color: #328dd1;
    }
</style>
