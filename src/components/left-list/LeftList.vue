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
                    <router-link tag="li" to="/discovery" class="m-item"><i class="iconfont icon-yinle"></i>发现音乐</router-link>
                    <router-link tag="li" to="/search" class="m-item"><i class="iconfont icon-sousuo"></i>搜索音乐</router-link>
                    <li class="m-item"><i class="iconfont icon-FM"></i>私人FM</li>
                    <router-link tag="li" to="/recommendSong" class="m-item"><i class="iconfont icon-tuijian"></i>每日歌曲推荐</router-link>
                </ul>
            </div>
            <div class="list my-music">
                <h2 class="title">我的音乐</h2>
                <ul>
                    <li class="m-item"><i class="iconfont icon-shoucang1"></i>我喜欢的</li>
                    <li class="m-item"><i class="iconfont icon-unif056"></i>我的收藏</li>
                    <li class="m-item"><i class="iconfont icon-zuijin"></i>播放历史</li>
                    <li class="m-item"><i class="iconfont icon-yun"></i>我的音乐云盘</li>
                </ul>
            </div>
            <div class="list created-song-list">
                <h2 class="title">创建的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in createdSongList"><i class="iconfont song-list" :class="item.privacy ? 'icon-password' : 'icon-gedan'"></i><p class="text">{{item.name}}</p></li>
                </ul>
            </div>
            <div class="list collected-song-list">
                <h2 class="title">收藏的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in collectedSongList"><i class="iconfont icon-gedan song-list"></i><p class="text">{{item.name}}</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import get from "../../common/js/api";
    import axios from 'axios'
    import {mapMutations} from 'vuex'

    export default {
        name: "LeftList",
        data () {
            return {
                userAvatar: '',
                userName: '',
                createdSongList: [],
                collectedSongList: []
            }
        },
        methods: {
            login (phone, password) {
                get('/login/cellphone', {
                    phone,
                    password
                }).then((res) => {
                    this.getUserDetail(res.account.id);
                    this.getUserSongList(res.account.id);
                });
            },
            getUserDetail (uid) {
                get('/user/detail', {
                    uid
                }).then((res) => {
                    this.userAvatar = res.profile.avatarUrl;
                    this.userName = res.profile.nickname;
                });
            },
            getUserSongList (uid) {
                get('/user/playlist', {
                    uid
                }).then((res) => {
                    let list = res.playlist, i = 1;
                    this.setUserFavorite(list[0]);
                    for (i; i < list.length; i++) {
                        if (!list[i].subscribed) {
                            this.createdSongList.push(list[i]);
                        } else {
                            this.collectedSongList.push(list[i]);
                        }
                    }
                });
            },
            ...mapMutations({
                setUserFavorite: 'SET_USER_FAVORITE'
            })
        },
        created () {
            axios.defaults.withCredentials = true;
            // this.login(15815048382, 'ygwgbwrk');
            // this.getUserDetail('554398977');
            // this.getUserSongList('554398977');
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
        box-sizing: border-box;
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
    .left-list .list-wrapper .list:last-child {
        margin-bottom: 0;
    }
    .left-list .list-wrapper .list .title {
        font-size: 13px;
        color: #8c8c8c;
        margin: 0 0 10px 20px;
    }
    .left-list .list-wrapper .list .m-item {
        line-height: 40px;
        display: flex;
        align-items: center;
    }
    .left-list .list-wrapper .list .m-item .iconfont {
        font-size: 16px;
        color: #000;
        margin: 0 14px 0 20px;
    }
    .left-list .list-wrapper .list .m-item:hover {
        background-color: #eee;
    }
    .left-list .list-wrapper .list .m-item .text {
        width: 160px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .left-list .list-wrapper .list .m-item.router-link-active {
        border-left: 4px solid #EC0000;
        background-color: #dddde1!important;
    }
    .left-list .list-wrapper .list .m-item.router-link-active .iconfont {
        margin-left: 16px;
    }
    .iconfont.song-list{
        font-size: 14px!important;
        margin-right: 8px!important;
    }
</style>
