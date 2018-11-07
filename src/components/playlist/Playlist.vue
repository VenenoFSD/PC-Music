<template>
    <transition name="playlist">
        <div class="playlist-wrapper" v-show="showFlag" @click="hide">
            <div class="playlist" @click.stop>
                <h2 class="title">播放列表</h2>
                <div class="clear" @click="showConfirm"><span class="iconfont icon-iconfontshanchu1"></span>清空</div>
                <div class="close" @click="hide"><span class="iconfont icon-shanchu"></span></div>
                <ul class="list" ref="list">
                    <li v-for="(item, index) in sequenceList" :class="{'bg': index % 2 === 0, 'current': item.id === currentSong.id}" class="playlist-item">
                        <div class="current-song" v-show="item.id === currentSong.id"><span class="iconfont icon-bofang"></span></div>
                        <p class="song-name">{{item.name}}</p>
                        <div class="play" @click="selectItem(item, index)"><span class="iconfont icon-bofang" v-show="item.id !== currentSong.id"></span></div>
                        <p class="singer">{{item.ar[0].name}}</p>
                        <p class="duration-time">{{durationFormat(item.dt)}}</p>
                        <div class="delete" @click="deleteOne(item)"><span class="iconfont icon-shanchu"></span></div>
                    </li>
                </ul>
            </div>
            <confirm ref="confirm" @confirm="deletePlaylist"></confirm>
        </div>
    </transition>
</template>

<script>
    import Confirm from '../../base/confirm/Confirm'
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import playMode from "../../common/js/config";

    export default {
        name: "Playlist",
        data () {
            return {
                showFlag: false
            }
        },
        methods: {
            show () {
                this.showFlag = true;
            },
            hide () {
                this.showFlag = false;
            },
            durationFormat (time) {
                time = time /1000 | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            selectItem (item, index) {
                if (this.playMode === playMode.random) {
                    index = this.playlist.findIndex((song) => {
                        return song.id === item.id;
                    });
                }
                this.setCurrentIndex(index);
                this.setPlayingState(true);
            },
            deleteOne (item) {
                this.deleteSong(item);
                if (!this.playlist.length) {
                    this.hide();
                }
            },
            scrollTo (newSong) {
                const index = this.sequenceList.findIndex((song) => {
                    return song.id === newSong.id
                });
                if (index <= this.sequenceList.length - 9) {
                    this.$refs.list.scrollTo(0, index * 46);
                }
            },
            showConfirm () {
                this.$refs.confirm.show();
            },
            deletePlaylist () {
                this.clearPlaylist();
                this.hide();
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            },
            ...mapMutations({
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE'
            }),
            ...mapActions([
                'deleteSong',
                'clearPlaylist'
            ])
        },
        watch: {
            currentSong (newSong, oldSong) {
                if (!this.showFlag || newSong.id === oldSong.id) {
                    return;
                }
                this.scrollTo(newSong);
            }
        },
        computed: {
            ...mapGetters([
                'sequenceList',
                'currentSong',
                'playlist',
                'playMode'
            ])
        },
        components: {
            Confirm
        }
    }
</script>

<style scoped>
    .playlist-enter, .playlist-leave-to{
        opacity: 0;
    }
    .playlist-enter .playlist, .playlist-leave-to .playlist {
        transform: translate3d(10%,0,0);
    }
    .playlist-enter-active, .playlist-leave-active{
        transition: all .4s;
    }
    .playlist-enter-active .playlist, .playlist-leave-active .playlist {
        transition: all .4s;
    }
    .playlist-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 61px;
        z-index: 5;
        background-color: rgba(0,0,0,.2);
    }
    .playlist {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 600px;
        height: 460px;
        border: 1px solid #ddd;
        border-bottom: none;
        box-shadow: 0 0 3px #ccc;
        background-color: #ffffff;
        color: #000;
    }
    .title, .playlist-item {
        line-height: 46px;
        box-sizing: border-box;
        padding-left: 36px;
    }
    .title {
        font-size: 15px;
    }
    .clear {
        position: absolute;
        right: 100px;
        top: 14px;
        color: #666;
    }
    .clear .iconfont {
        vertical-align: middle;
    }
    .close {
        position: absolute;
        right: 20px;
        top: 14px;
    }
    .list {
        height: 414px;
        overflow: auto;
    }
    .playlist-item {
        font-size: 13px;
        display: flex;
        position: relative;
    }
    .playlist-item.bg {
        background-color: #f9f9f9;
    }
    .playlist-item:hover {
        background-color: #f2f2f2;
    }
    .playlist-item:hover .play {
        display: block;
    }
    .playlist-item:hover .delete {
        display: block;
    }
    .playlist-item.current {
        color: #c62e2e;
    }
    .current-song, .play {
        position: absolute;
        left: 12px;
    }
    .current-song .iconfont, .play {
        font-size: 13px;
    }
    .playlist-item .play {
        display: none;
        color: #666;
    }
    .playlist-item .song-name {
        flex:  0 0 55%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .playlist-item .singer {
        flex:  0 0 30%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .playlist-item .duration-time {
        flex:  0 0 10%;
    }
    .playlist-item .delete {
        flex: 0 0 5%;
        display: none;
    }
</style>
