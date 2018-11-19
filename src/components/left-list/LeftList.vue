<template>
    <div class="left-list">
        <div class="user">
            <div class="user-avatar">
                <img :src="userAvatar" width="80" height="80">
            </div>
            <p class="user-name">{{userName}}</p>
            <div class="about-btn" @click="showAbout"><span class="iconfont icon-guanyu"></span></div>
        </div>
        <div class="list-wrapper">
            <div class="list recommend-music">
                <h2 class="title">推荐音乐</h2>
                <ul>
                    <router-link tag="li" to="/discovery" class="m-item"><i class="iconfont icon-yinle"></i>发现音乐</router-link>
                    <router-link tag="li" to="/search" class="m-item"><i class="iconfont icon-sousuo"></i>搜索音乐</router-link>
                    <li class="m-item" @click="playFM"><i class="iconfont icon-FM"></i>私人FM</li>
                    <router-link tag="li" to="/recommendSong" class="m-item"><i class="iconfont icon-tuijian"></i>每日歌曲推荐</router-link>
                </ul>
            </div>
            <div class="list my-music">
                <h2 class="title">我的音乐</h2>
                <ul>
                    <router-link tag="li" to="/userFavorite" class="m-item"><i class="iconfont icon-shoucang1"></i>我喜欢的</router-link>
                    <router-link tag="li" to="/myCollection" class="m-item"><i class="iconfont icon-unif056"></i>我的收藏</router-link>
                    <router-link tag="li" to="/recentPlay" class="m-item"><i class="iconfont icon-zuijin"></i>最近播放</router-link>
                    <router-link tag="li" to="/myCloud" class="m-item"><i class="iconfont icon-yun"></i>我的音乐云盘</router-link>
                </ul>
            </div>
            <div class="list created-song-list">
                <h2 class="title">创建的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in createdSongList" @click="selectSongList(item)"><i class="iconfont song-list" :class="item.privacy ? 'icon-password' : 'icon-gedan'"></i><p class="text">{{item.name}}</p></li>
                </ul>
            </div>
            <div class="list collected-song-list">
                <h2 class="title">收藏的歌单</h2>
                <ul>
                    <li class="m-item" v-for="item in collectedSongList" @click="selectSongList(item)"><i class="iconfont icon-gedan song-list"></i><p class="text">{{item.name}}</p></li>
                </ul>
            </div>
        </div>
        <about ref="about"></about>
    </div>
</template>

<script>
    import About from '../about/About'
    import get from "../../common/js/api";
    import axios from 'axios'
    import {mapMutations, mapActions, mapGetters} from 'vuex'

    export default {
        name: "LeftList",
        data () {
            return {
                userAvatar: '',
                userName: '',
                createdSongList: [],
                collectedSongList: [],
                FMSong: []
            }
        },
        methods: {
            getUserDetail () {
                get('/login/status').then((res) => {
                    this.userAvatar = res.profile.avatarUrl;
                    this.userName = res.profile.nickname;
                    this.getUserSongList(res.profile.userId);
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
            selectSongList (item) {
                this.setSongList(item);
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: item.id,
                        title: '歌单'
                    }
                });
            },
            playFM () {
                this.getFMSong(this.FMFirstPlay);
            },
            getFMSong (fn) {
                get('/personal_fm', {
                    time: Date.parse(new Date())
                }).then((res) => {
                    this.FMSong = this._formatSong(res.data);
                    fn({
                        list: this.FMSong
                    });
                });
            },
            showAbout () {
                this.$refs.about.show();
            },
            _formatSong (songs) {
                let result = [];
                for (let i = 0; i < songs.length; i++) {
                    result.push({
                        name: songs[i].name,
                        id: songs[i].id,
                        al: songs[i].album,
                        ar: songs[i].artists,
                        dt: songs[i].duration,
                        alia: songs[i].alias
                    });
                }
                return result;
            },
            ...mapMutations({
                setUserFavorite: 'SET_USER_FAVORITE',
                setSongList: 'SET_SONG_LIST'
            }),
            ...mapActions([
                'FMFirstPlay',
                'FMContinuePlay'
            ])
        },
        created () {
            axios.defaults.withCredentials = true;
        },
        computed: {
            ...mapGetters([
                'currentIndex',
                'playlist',
                'loginStatus',
                'isFM'
            ])
        },
        watch: {
            currentIndex (newIndex) {
                if (this.isFM && newIndex === this.playlist.length - 1) {
                    this.getFMSong(this.FMContinuePlay);
                }
            },
            loginStatus (newStatus) {
                if (newStatus) {
                    this.getUserDetail();
                }
            }
        },
        components: {
            About
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
        position: relative;
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
    .user:hover .about-btn {
        display: block;
    }
    .user .about-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #aaa;
        display: none;
    }
    .user .about-btn .iconfont {
        font-size: 20px;
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
