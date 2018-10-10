<template>
    <div class="left-list">
        <div class="user">
            <div class="user-avatar">
                <img :src="userAvatar" width="80" height="80">
            </div>
            <p class="user-name">{{userName}}</p>
        </div>
        <div class="list-wrapper">
            <div class="list recommend-music">
                <h2 class="title">推荐音乐</h2>
                <ul>
                    <li class="m-item active"><i class="iconfont icon-yinle"></i>发现音乐</li>
                    <li class="m-item"><i class="iconfont icon-sousuo"></i>搜索音乐</li>
                    <li class="m-item"><i class="iconfont icon-FM"></i>私人FM</li>
                    <li class="m-item"><i class="iconfont icon-tuijian"></i>每日歌曲推荐</li>
                    <li class="m-item"><i class="iconfont icon-paihangbang"></i>排行版</li>
                </ul>
            </div>
            <div class="list my-music">
                <h2 class="title">我的音乐</h2>
                <ul>
                    <li class="m-item"><i class="iconfont icon-shoucang1"></i>我喜欢的</li>
                    <li class="m-item"><i class="iconfont icon-unif056"></i>我的收藏</li>
                    <li class="m-item"><i class="iconfont icon-zuijin"></i>播放历史</li>
                </ul>
            </div>
            <div class="list created-song-list">
                <h2 class="title">创建的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in createdSongList"></li>
                </ul>
            </div>
            <div class="list collected-song-list">
                <h2 class="title">收藏的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in collectedSongList"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeftList",
        data () {
            return {
                userAvatar: '',
                userName: '',
                createdSongList: [],
                collectedSongList: []
            }
        }
    }
</script>

<style scoped>
    .left-list {
        width: 210px;
        height: 100%;
        background-color: #f8f8f8;
        color: #333;
        padding-top: 40px;
        display: flex;
        flex-direction: column;
    }
    .left-list .user {
        height: 110px;
        margin: 0 20px 30px 20px;
    }
    .left-list .user .user-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #eee;
        margin: 0 auto;
        overflow: hidden;
    }
    .left-list .user .user-name {
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .left-list .list-wrapper {
        flex: 1;
        overflow: hidden;
    }
    .left-list .list-wrapper:hover {
        overflow: auto;
    }
    .left-list .list-wrapper .list {
        margin-bottom: 30px;
    }
    .left-list .list-wrapper .list .title {
        font-size: 13px;
        color: #8c8c8c;
        margin: 0 0 10px 20px;
    }
    .left-list .list-wrapper .list .m-item {
        line-height: 36px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .left-list .list-wrapper .list .m-item .iconfont {
        font-size: 16px;
        color: #000;
        margin: 0 14px 0 20px;
    }
    .left-list .list-wrapper .list .m-item:hover {
        background-color: #eee;
    }
    .left-list .list-wrapper .list .active {
        border-left: 4px solid red;
        background-color: #dddde1!important;
    }
    .left-list .list-wrapper .list .active .iconfont {
        margin-left: 16px;
    }
</style>
