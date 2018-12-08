<template>
    <div class="user-detail-wrapper">
        <div class="ud-header" v-if="userDetail.profile">
            <div class="background" :style="{background: 'url(' + userDetail.profile.avatarUrl + ') no-repeat 0 20%'}"></div>
            <h2 class="ud-title">个人主页</h2>
            <div class="user-detail">
                <img :src="userDetail.profile.avatarUrl" class="img">
                <div class="user-desc-wrapper">
                    <p class="user-name">{{userDetail.profile.nickname}}<span class="iconfont" :class="[genderIcon(), genderIconColor()]"></span><span class="level">{{userLevel()}}</span></p>
                    <separate></separate>
                    <ul class="user-active">
                        <li class="ua-item">
                            <p class="count">{{userDetail.profile.eventCount}}</p>
                            <p class="text">动态</p>
                        </li>
                        <li class="ua-item">
                            <p class="count">{{userDetail.profile.follows}}</p>
                            <p class="text">关注</p>
                        </li>
                        <li class="ua-item">
                            <p class="count">{{userDetail.profile.followeds}}</p>
                            <p class="text">粉丝</p>
                        </li>
                    </ul>
                    <p class="personal-description">个人介绍：{{userDetail.profile.signature}}</p>
                    <p class="age">年龄：{{userAge()}}后</p>
                </div>
            </div>
        </div>
        <div class="play-count-wrapper">
            <h2 class="title">一周听歌排行<span class="song-count">累计听歌：{{userDetail.listenSongs}}首</span></h2>
            <separate></separate>
            <ul class="play-count-list">
                <li v-for="(item, index) in playRecord" class="pc-item" :class="{'bg': index % 2 === 0}">
                    <p class="num">{{_rankFormat(index)}}</p>
                    <p class="song-name">{{item.name}}<span v-if="item.aliaName && item.aliaName.length">（{{item.aliaName}}）</span></p>
                    <div class="play-count">{{item.playCount}}次
                        <div class="play-count-inner" :style="{'width': item.widthPercent}"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Separate from '../../base/separate/Separate'
    import {mapGetters} from 'vuex'
    import get from '../../common/js/api'
    import {rankFormat} from "../../common/js/dataFormat";

    export default {
        name: "UserDetail",
        data () {
            return {
                playRecord: [],
                maxPlay: -1,
                userDetail: {}
            }
        },
        methods: {
            getUserPlayRecord () {
                get('/user/record', {
                    uid: this.userFavorite.userId,
                    type: 1
                }).then((res) => {
                    if (res.weekData.length) {
                        let list = res.weekData.slice(0, 10);
                        this.maxPlay = list[0].playCount;
                        for (let i = 0; i < list.length; i++) {
                            let obj = {};
                            obj.name = list[i].song.name;
                            obj.aliaName = list[i].song.song.aliaName;
                            obj.playCount = list[i].playCount;
                            obj.widthPercent = 0;
                            this.playRecord.push(obj);
                        }
                        this.setWidthPercent();
                    }
                });
            },
            setWidthPercent () {
                setTimeout(() => {
                    for (let i = 0; i < this.playRecord.length; i++) {
                        this.playRecord[i].widthPercent = (this.playRecord[i].playCount / this.maxPlay).toFixed(2) * 100 + '%';
                    }
                }, 300);
            },
            getUserDetail () {
                get('/user/detail', {
                    uid: this.userFavorite.userId
                }).then((res) => {
                    this.userDetail = res;
                });
            },
            genderIcon () {
                return this.userDetail.profile.gender === 1 ? 'icon-nan' : this.userDetail.profile.gender === 2 ? 'icon-nv' : '';
            },
            genderIconColor () {
                return this.userDetail.profile.gender === 1 ? 'man' : this.userDetail.profile.gender === 2 ? 'woman' : '';
            },
            userLevel () {
                return 'Lv.' + this.userDetail.level;
            },
            userAge () {
                let date = new Date(this.userDetail.profile.birthday);
                let year = date.getFullYear();
                let prevYear = Math.floor(year / 5) * 5 + '';
                return prevYear.substring(2, 4);
            },
            _rankFormat (index) {
                return rankFormat(index);
            }
        },
        computed: {
            ...mapGetters([
                'userFavorite'
            ])
        },
        created () {
            this.getUserPlayRecord();
            this.getUserDetail();
        },
        components: {
            Separate
        }
    }
</script>

<style scoped>
    .user-detail-wrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .play-count-wrapper {
        padding: 0 20px;
        background-color: #fafafc;
        flex: 1;
    }
    .user-detail {
        display: flex;
        margin-bottom: 30px;
    }
    .ud-header {
        position: relative;
        background: linear-gradient(to bottom, rgba(255,255,255,.8), #fafafc);
        padding: 20px 20px 0 20px;
        overflow: hidden;
    }
    .ud-header .background {
        height: 90%;
        z-index: -2;
        position: absolute;
        left: -2%;
        right: -2%;
        top: -20px;
        overflow: hidden;
        background-size: cover!important;
        filter: blur(30px);
    }
    .user-detail .img {
        flex: 0 0 200px;
        width: 200px;
        height: 200px;
    }
    .user-detail .user-desc-wrapper {
        flex: 1;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 13px;
        color: #666;
    }
    .user-desc-wrapper .user-name {
        font-size: 20px;
        line-height: 30px;
        height: 30px;
        margin-bottom: 16px;
    }
    .user-desc-wrapper .user-active {
        margin-top: 10px;
        display: flex;
    }
    .user-active .ua-item {
        text-align: center;
        border-right: 1px solid #ddd;
        padding: 0 16px;
    }
    .user-active .ua-item:first-child {
        padding-left: 0;
    }
    .user-active .ua-item:last-child {
        border: none;
        padding-right: 0;
    }
    .user-desc-wrapper .personal-description {
        margin: 20px 0 10px 0;
        font-size: 12px;
    }
    .user-name .iconfont {
        font-size: 14px;
        vertical-align: middle;
        margin: 0 8px;
    }
    .user-name .iconfont.man {
        color: deepskyblue;
    }
    .user-name .iconfont.woman {
        color: deeppink;
    }
    .user-name .level {
        border: 1px solid #df3b3b;
        border-radius: 8px;
        font-size: 12px;
        padding: 0 4px;
        vertical-align: top;
        color: #df3b3b;
    }
    .ud-title {
        font-size: 12px;
        color: #888;
        margin-bottom: 20px;
    }
    .play-count-wrapper .title {
        font-size: 18px;
        margin-bottom: 10px;
    }
    .play-count-wrapper .title .song-count {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
    }
    .play-count-list {
        margin-top: 20px;
    }
    .pc-item {
        display: flex;
        line-height: 40px;
        font-size: 13px;
        color: #666;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .pc-item.bg {
        background-color: #f4f4f6;
    }
    .pc-item:hover {
        background-color: rgb(242, 242, 243);
    }
    .pc-item .song-name {
        flex: 0 0 calc(50% - 30px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .pc-item .play-count {
        flex: 0 0 50%;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .pc-item .num {
        flex: 0 0 30px;
    }
    .play-count .play-count-inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: skyblue;
        opacity: 0.2;
        transition: width 2s;
    }
</style>
