<template>
    <div class="player">
        <transition>
            <div class="normal-player" v-if="playlist.length && fullScreen">
                <div class="back" :style="{background: 'url(' + currentSong.al.picUrl + ') no-repeat center center'}"></div>
                <div class="hide" @click="hide"><i class="iconfont icon-shouqi_m"></i></div>
                <div class="top">
                    <div class="record">
                        <div class="img-wrapper" :class="imgWrapperAnimate">
                            <img :src="currentSong.al.picUrl" class="img">
                        </div>
                        <div class="img-player" :class="{'play': playingState}"></div>
                    </div>
                    <div class="song-wrapper">
                        <h2 class="song-name">{{currentSong.name}}</h2>
                        <p class="desc-wrapper">歌手：<span class="desc">{{artistsFormat(currentSong.ar)}}</span>专辑：<span class="desc">{{currentSong.al.name}}</span></p>
                        <div class="lyric-wrapper">

                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="prev left-btn" @click="prev">
                        <i class="iconfont icon-shangyishou"></i>
                    </div>
                    <div class="play left-btn" @click="togglePlaying">
                        <i class="iconfont" :class="playIcon"></i>
                    </div>
                    <div class="next left-btn" @click="next">
                        <i class="iconfont icon-xiayishou"></i>
                    </div>
                    <div class="progress-bar-wrapper">
                        <progress-bar
                            :songName="currentSong.name"
                            :artistName="currentSong.ar"
                            :durationTime="currentSong.dt"
                            :currentTime="currentTime"
                            :percent="percent"
                            @percentChange="changePercent"
                        ></progress-bar>
                    </div>
                    <div class="store right-btn">
                        <i class="iconfont icon-shoucang1"></i>
                    </div>
                    <div class="play-order right-btn">
                        <i class="iconfont icon-shunxu"></i>
                    </div>
                    <div class="voice right-btn">
                        <i class="iconfont icon-yinliang"></i>
                    </div>
                    <div class="voice-pb-wrapper" @mousemove="mouseMove" @mouseup="mouseUp">
                        <div class="voice-pb" @click="volumeClick">
                            <div class="voice-progress-bar">
                                <div class="voice-progress" ref="voiceProgress"></div>
                                <div class="voice-progress-btn" @mousedown.prevent="mouseDown" ref="voiceProgressBtn">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="mini-player">
            <div class="img-wrapper">
                <img :src="currentSong.al.picUrl" width="60" height="60" v-if="playlist.length">
                <div class="show-normal" @click="showNormal">
                    <i class="iconfont icon-fangda"></i>
                </div>
            </div>
            <div class="mlb-wrapper">
                <div class="prev m-left-btn" @click="prev">
                    <i class="iconfont icon-shangyishou"></i>
                </div>
                <div class="play m-left-btn" @click="togglePlaying">
                    <i class="iconfont" :class="playIcon"></i>
                </div>
                <div class="next m-left-btn" @click="next">
                    <i class="iconfont icon-xiayishou"></i>
                </div>
            </div>
            <div class="progress-bar-wrapper">
                <progress-bar
                    :songName="currentSong.name"
                    :artistName="currentSong.ar"
                    :durationTime="currentSong.dt"
                    :currentTime="currentTime"
                    :percent="percent"
                    @percentChange="changePercent"
                ></progress-bar>
            </div>
            <div class="playlist">
                <i class="iconfont icon-liebiao"></i>
            </div>
        </div>
        <audio :src="songId" ref="audio" v-if="playlist.length" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
    import ProgressBar from '../../base/progress-bar/ProgressBar'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "Player",
        data () {
            return {
                songReady: false,
                currentTime: 0
            }
        },
        methods: {
            hide () {
                this.setFullScreen(false);
            },
            artistsFormat (artists) {
                let arr = [];
                for (let i = 0; i < artists.length; i++) {
                    arr.push(artists[i].name);
                }
                return arr.join(' / ');
            },
            showNormal () {
                this.setFullScreen(true);
            },
            togglePlaying () {
                if (!this.songReady) {
                    return;
                }
                this.setPlayingState(!this.playingState);
            },
            prev () {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex - 1;
                if (index === -1) {
                    index = this.playlist.length - 1;
                }
                this.setCurrentIndex(index);
                if (!this.playingState) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            next () {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex + 1;
                if (index === this.playlist.length) {
                    index = 0;
                }
                this.setCurrentIndex(index);
                if (!this.playingState) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            ready () {
                this.songReady = true;
            },
            error () {
                this.songReady = true;
            },
            updateTime (e) {
                this.currentTime = e.target.currentTime;
            },
            changePercent (newPercent) {
                this.$refs.audio.currentTime = this.currentSong.dt / 1000 * newPercent;
                if (!this.playingState) {
                    this.togglePlaying();
                }
            },
            mouseDown (e) {
                this.volumeTouch.initiated = true;
                this.volumeTouch.startX = e.screenX;
                this.volumeTouch.left = this.$refs.voiceProgress.clientWidth;
            },
            mouseMove (e) {
                if (!this.volumeTouch.initiated) {
                    return;
                }
                let deltaX = e.screenX - this.volumeTouch.startX;
                let offsetWidth = Math.min(100, Math.max(0, this.volumeTouch.left + deltaX));
                this._offset(offsetWidth);
                this.changeVolume(this.$refs.voiceProgress.clientWidth / 100);
            },
            mouseUp () {
                if (!this.volumeTouch.initiated) {
                    return;
                }
                this.volumeTouch.initiated = false;
            },
            volumeClick (e) {
                this._offset(e.offsetX);
                this.changeVolume(this.$refs.voiceProgress.clientWidth / 100);
            },
            _offset (offsetWidth) {
                this.$refs.voiceProgress.style.width = `${offsetWidth}px`;
                this.$refs.voiceProgressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
            },
            changeVolume (newPercent) {
                this.$refs.audio.volume = newPercent;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX'
            })
        },
        created () {
            this.volumeTouch = {};
        },
        computed: {
            songId () {
                return `http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
            },
            playIcon () {
                return this.playingState ? 'icon-zanting' : 'icon-bofang';
            },
            imgWrapperAnimate () {
                return this.playingState ? 'play' : 'play pause';
            },
            percent () {
                return this.currentTime * 1000 / this.currentSong.dt;
            },
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong',
                'playingState',
                'currentIndex'
            ])
        },
        watch: {
            currentSong () {
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
            },
            playingState (newState) {
                this.$nextTick(() => {
                    const audio = this.$refs.audio;
                    newState ? audio.play() : audio.pause();
                });
            }
        },
        components: {
            ProgressBar
        }
    }
</script>

<style scoped>
    .v-enter, .v-leave-to{
        opacity: 0;
        transform: translate3d(0, 20%, 0);
    }
    .v-enter-active, .v-leave-active{
        transition: all 1s cubic-bezier(.51,-1.3,.62,2.2);
    }
    .normal-player {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 5;
        background-color: #aaa;
    }
    .normal-player .back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: cover!important;
        filter: blur(36px);
        opacity: 0.3;
    }
    .normal-player .hide {
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .normal-player .hide .iconfont{
        font-size: 46px;
        color: #fff;
    }
    .top {
        width: 70%;
        height: calc(100% - 100px);
        margin: 0 auto;
        overflow: hidden;
        padding: 0 20px;
        display: flex;
        box-sizing: border-box;
        align-items: center;
    }
    .top .record {
        width: 340px;
        height: 340px;
        position: relative;
        flex: 0 0 340px;
    }
    .top .img-wrapper {
        font-size: 0;
        width: 100%;
        height: 100%;
        background: url("./record.png") no-repeat 0 0;
        background-size: 100% 100%;
        padding: 50px;
        box-sizing: border-box;
        border-radius: 50%;
        box-shadow: 0 0 20px #fff;
    }
    .top .img-wrapper.play {
        animation: rotate 36s linear infinite;
    }
    .top .img-wrapper.pause {
        animation-play-state: paused;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .top .img-wrapper .img {
        width: 240px;
        height: 240px;
        border-radius: 50%;
    }
    .top .img-player {
        position: absolute;
        left: 120px;
        top: -110px;
        background: url("./player.png") no-repeat 0 0;
        background-size: 100% 100%;
        width: 128px;
        height: 180px;
        z-index: 1;
        transform: rotate(-42deg);
        transform-origin: 21px 21px;
        transition: all 0.4s;
    }
    .top .img-player.play {
        transform: rotate(-4deg);
    }
    .top .song-wrapper {
        flex: 1;
        height: 100%;
        padding: 50px 0 0 40px;
        display: flex;
        flex-direction: column;
        text-align: center;
        box-sizing: border-box;
    }
    .top .song-wrapper .desc-wrapper {
        margin-top: 14px;
        font-size: 13px;
    }
    .top .song-wrapper .desc-wrapper .desc {
        color: #28619a;
    }
    .top .song-wrapper .desc-wrapper .desc:first-child {
        margin-right: 16px;
    }
    .top .song-wrapper .lyric-wrapper {
        flex: 1;
    }
    .bottom {
        height: 100px;
        display: flex;
        align-items: center;
        padding: 0 50px;
    }
    .bottom .iconfont{
        font-size: 24px;
    }
    .left-btn .iconfont {
        color: #f3f3f3;
    }
    .bottom .play {
        margin: 0 30px;
    }
    .bottom .play .iconfont {
        font-size: 36px;
    }
    .right-btn {
        margin-right: 20px;
    }
    .right-btn:last-child {
        margin-right: 0;
    }
    .right-btn .iconfont {
        color: #eee;
    }
    .right-btn.voice {
        margin-right: 10px;
    }
    .voice-pb-wrapper {
        flex: 0 0 100px;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 6px;
    }
    .voice-pb {
        width: 100%;
        padding: 6px 0;
    }
    .voice-progress-bar {
        flex: 1;
        height: 2px;
        background-color: #ccc;
        position: relative;
    }
    .voice-progress-bar .voice-progress {
        position: absolute;
        height: 100%;
        width: 0;
        left: 0;
        top: 0;
        background-color: #c73d3b;
    }
    .voice-progress-bar .voice-progress-btn {
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        left: -7px;
        top: -6px;
        background-color: #ddd;
    }
    .voice-progress-btn span {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #b03836;
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .normal-player .progress-bar-wrapper {
        height: 100%;
        flex: 1;
        padding: 0 40px;
    }
    .mini-player {
        position: fixed;
        width: 100vw;
        height: 60px;
        left: 0;
        bottom: 0;
        z-index: 4;
        background-color: #fafafc;
        border-top: 1px solid #ddd;
        display: flex;
        align-items: center;
    }
    .mlb-wrapper {
        flex: 0 0 140px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
    }
    .mini-player .img-wrapper {
        position: relative;
        font-size: 0;
        width: 60px;
        height: 100%;
        flex: 0 0 60px;
    }
    .mini-player .img-wrapper:hover .show-normal {
        display: block;
    }
    .mini-player .img-wrapper .show-normal {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
        display: none;
        padding: 10px 0 0 10px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .img-wrapper .show-normal .iconfont {
        color: #fff;
        font-size: 40px;
    }
    .mini-player .m-left-btn {
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #df3b3b;
        padding: 5px 0 0 9px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .mini-player .m-left-btn.play {
        width: 36px;
        height: 36px;
        padding: 9px 0 0 11px;
    }
    .mini-player .m-left-btn .iconfont {
        font-size: 12px;
    }
    .mini-player .m-left-btn.play .iconfont {
        font-size: 16px;
    }
    .mini-player .progress-bar-wrapper {
        flex: 1;
        height: 100%;
    }
    .mini-player .progress-bar-wrapper >>> .pb {
        margin-top: 2px;
    }
    .mini-player .progress-bar-wrapper >>> .progress-bar-desc {
        color: #222;
        font-size: 12px;
    }
    .mini-player .progress-bar-wrapper >>> .desc-normal {
        color: #999;
    }
    .mini-player .progress-bar-wrapper >>> .progress-bar {
        background-color: #e4e4e4;
    }
    .mini-player .progress-bar-wrapper >>> .progress-bar .progress-btn {
        background-color: #fff;
        box-shadow: 0 0 2px #000;
    }
    .mini-player .playlist {
        padding: 0 30px;
        box-sizing: border-box;
        flex: 0 0 76px;
    }
    .mini-player .playlist .iconfont {
        color: #aaa;
    }
</style>
