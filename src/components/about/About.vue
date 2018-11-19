<template>
    <transition>
        <div class="about-wrapper" v-show="showAbout">
            <div class="about">
                <h2 class="title">关于</h2>
                <separate></separate>
                <div class="description">
                    <h2 class="d-title">项目说明</h2>
                    <p class="text">~ 本项目为 Vue2.x 版PC端网易云音乐，UI参照 <a href="https://www.microsoft.com/zh-cn/p/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90uwp/9nblggh6g0jf?rtc=1" target="_blank">网易云音乐UWP版</a> 界面</p>
                    <p class="text">~ 项目骨架为 Vue CLI 脚手架，由 Vue2.5 + vuex + vue-router + vue-axios 搭建而成</p>
                    <p class="text">~ 感谢 <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" target="_blank">Binaryify</a> 提供网易云音乐接口支持，本项目Github地址：<a href="https://github.com/VenenoFSD/PC-Music" target="_blank">PC-Music</a></p>
                    <p class="text">~ 注意：由于本项目为登陆真实网易云音乐账号获取真实数据，出于安全考虑，本项目只提供读操作（如获取并播放音乐），不提供写操作（如收藏或取消收藏歌曲歌单，私信评论等功能），避免由于接口问题引起冲突</p>
                    <p class="text">~ 如遇到部分歌曲无法播放的问题，那是由于网易云音乐本身的版权问题引起的</p>
                </div>
                <div class="feature">
                    <h2 class="d-title">功能介绍</h2>
                    <p class="text">~ 登录网易云音乐（目前暂时只支持手机号登录）</p>
                    <p class="text">~ 登录后可获取自己收藏和创建的歌单并播放</p>
                    <p class="text">~ 播放歌曲时可调节音量，选择播放或暂停，选择上一首或下一首，可选择播放模式：单曲循环，顺序播放，乱序播放</p>
                    <p class="text">~ 可调出当前播放列表，在播放列表选择歌曲播放，删除列表中某一首或清空播放列表</p>
                    <p class="text">~ 支持分类搜索，可搜索单曲，专辑，歌手及歌单，搜索记录会被保留</p>
                    <p class="text">~ 播放过的歌曲会记录在最近播放列表中</p>
                    <p class="text">~ 支持每日歌曲推荐，私人FM，音乐云盘</p>
                    <p class="text">~ 发现音乐界面与网易云音乐基本一致，但暂时不支持MV播放</p>
                </div>
                <div class="close" @click="hide"><span class="iconfont icon-shanchu"></span></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Separate from '../../base/separate/Separate'

    export default {
        name: "About",
        data () {
            return {
                showAbout: false
            }
        },
        methods: {
            show () {
                this.showAbout = true;
            },
            hide () {
                this.showAbout = false;
            }
        },
        components: {
            Separate
        }
    }
</script>

<style scoped>
    .v-enter, .v-leave-to{
        opacity: 0;
    }
    .v-enter-active, .v-leave-active{
        transition: all .4s;
    }
    .about-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-color: rgba(0,0,0,.4);
    }
    .about {
        width: 800px;
        height: 600px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 10px #999;
        background-color: #fff;
        border-radius: 6px;
        padding: 30px;
        box-sizing: border-box;
    }
    .title {
        font-size: 20px;
        color: #000;
        margin-bottom: 16px;
    }
    .description {
        margin: 30px 0;
    }
    .d-title {
        font-size: 16px;
        margin-bottom: 16px;
    }
    .text {
        font-size: 14px;
        text-indent: 10px;
        line-height: 22px;
    }
    .text a {
        color: #ce0000;
    }
    .close {
        position: absolute;
        right: 30px;
        top: 34px;
    }
    .close .iconfont {
        font-size: 20px;
    }
</style>
