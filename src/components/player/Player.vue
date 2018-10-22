<template>
    <div class="player">
        <transition>
            <div class="normal-player" v-if="playlist.length && fullScreen">
                <div class="back" :style="{background: 'url(' + currentSong.al.picUrl + ') no-repeat center center'}"></div>
                <div class="hide" @click="hide"><i class="iconfont icon-shouqi_m"></i></div>
                <div class="top">
                    <div class="img-wrapper">
                        <img :src="currentSong.al.picUrl" class="img">
                        <div class="img-player"></div>
                    </div>
                    <div class="song-wrapper">
                        <h2 class="song-name">{{currentSong.name}}</h2>
                        <p class="desc-wrapper">歌手：<span class="desc">{{artistsFormat(currentSong.ar)}}</span>专辑：<span class="desc">{{currentSong.al.name}}</span></p>
                        <div class="lyric-wrapper">

                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="prev left-btn">
                        <i class="iconfont icon-shangyishou"></i>
                    </div>
                    <div class="play left-btn">
                        <i class="iconfont icon-bofang"></i>
                    </div>
                    <div class="next left-btn">
                        <i class="iconfont icon-xiayishou"></i>
                    </div>
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar-desc">
                            <p class="song-desc">{{currentSong.name}}<span class="desc-normal"> - {{artistsFormat(currentSong.ar)}}</span></p>
                            <p class="time-desc">00:00<span class="desc-normal"> / {{durationFormat(currentSong.dt)}}</span></p>
                        </div>
                        <div class="progress-bar">
                            <div class="progress"></div>
                            <div class="progress-btn">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="store right-btn">
                        <i class="iconfont icon-shoucang1"></i>
                    </div>
                    <div class="play-state right-btn">
                        <i class="iconfont icon-shunxu"></i>
                    </div>
                    <div class="voice right-btn">
                        <i class="iconfont icon-yinliang"></i>
                    </div>
                    <div class="playlist right-btn">
                        <i class="iconfont icon-liebiao"></i>
                    </div>
                </div>
            </div>
        </transition>
        <div class="mini-player">
            <div class="img-wrapper">
                <img :src="currentSong.al.picUrl" width="60" height="60">
                <div class="show-normal">
                    <i class="iconfont icon-fangda"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "Player",
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
            durationFormat (time) {
                time = time / 1000 | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        },
        computed: {
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong'
            ])
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
    .top .img-wrapper {
        font-size: 0;
        width: 340px;
        height: 340px;
        background: url("./record.png") no-repeat 0 0;
        background-size: 100% 100%;
        padding: 50px;
        box-sizing: border-box;
        border-radius: 50%;
        box-shadow: 0 0 20px #fff;
        flex: 0 0 340px;
        position: relative;
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
        color: #fff;
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
        color: #ddd;
    }
    .progress-bar-wrapper {
        flex: 1;
        padding: 0 40px;
    }
    .progress-bar-desc {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .progress-bar-desc .desc-normal {
        color: #444;
    }
    .progress-bar {
        width: 100%;
        height: 2px;
        background-color: #ccc;
        margin: 20px 0;
        position: relative;
    }
    .progress-bar .progress {
        position: absolute;
        height: 100%;
        width: 100px;
        left: 0;
        top: 0;
        background-color: #d13c3a;
    }
    .progress-bar .progress-btn {
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        left: 91px;
        top: -8px;
        background-color: #eee;
    }
    .progress-btn span {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #d13c3a;
        position: absolute;
        top: 7px;
        left: 7px;
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
        background-color: rgba(0,0,0,.4);
        display: none;
    }
    .img-wrapper .show-normal .iconfont {
        color: #fff;
        font-size: 60px;
    }
</style>
