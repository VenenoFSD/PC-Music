<template>
    <div class="singer-album" @scroll="handleScroll" ref="singerAlbum">
        <ul class="singer-album-list" ref="singerAlbumList">
            <li v-for="item in album" class="sb-item">
                <div class="img-wrapper">
                    <img v-lazy="item.picUrl" class="img">
                    <div class="cover"></div>
                </div>
                <div class="desc">
                    <p class="name">{{item.name}}<span v-if="item.alias.length">（{{item.alias[0]}}）</span></p>
                    <p class="time">{{timeFormat(item.publishTime)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    let clientHeight = 0,
        songListHeight = 0,
        scrollTop = 0,
        timer_1 = null,
        timer_2 = null;

    export default {
        name: "SingerAlbum",
        data () {
            return {
                hadLoad: false,
                album: [],
                hasMore: true,
                offset: 0,
                canLoad: true
            }
        },
        props: {
            currentSelect: {
                type: String,
                default: ''
            },
            singerId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            getSingerDesc () {
                if (!this.hasMore) {
                    return;
                }
                clearTimeout(timer_2);
                timer_2 = setTimeout(() => {
                    this.canLoad = true;
                }, 1500);
                axios.get(`http://localhost:3000/artist/album?id=${this.singerId}&limit=48&offset=${this.offset}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.album = this.album.concat(res.data.hotAlbums);
                        this.hasMore = res.data.more;
                        this.offset = this.album.length;
                    }
                });
            },
            timeFormat (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                return `${year}-${month}-${day}`;
            },
            handleScroll () {
                clearTimeout(timer_1);
                timer_1 = setTimeout(() => {
                    this.scrollToEnd();
                }, 200);
            },
            scrollToEnd () {
                clientHeight = this.$refs.singerAlbum.clientHeight;
                songListHeight = this.$refs.singerAlbumList.offsetHeight;
                scrollTop = this.$refs.singerAlbum.scrollTop;
                console.log(clientHeight, songListHeight, scrollTop);
                if ((clientHeight + scrollTop >= songListHeight) && this.canLoad) {
                    this.canLoad = false;
                    this.getSingerDesc();
                }
            }
        },
        watch: {
            currentSelect (newSelect) {
                if (newSelect === 'album' && !this.hadLoad) {
                    this.hadLoad = true;
                    this.getSingerDesc();
                }
            }
        }
    }
</script>

<style scoped>
    .singer-album {
        padding: 30px 26px 0 30px;
        overflow: auto;
    }
    .singer-album-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .sb-item {
        width: 14.3%;
        flex: 0 0 14.3%;
        margin-bottom: 30px;
    }
    .img-wrapper {
        font-size: 0;
        background: url("./coverall.png") no-repeat 0 0;
        background-size: 100% 100%;
        margin-bottom: 6px;
        position: relative;
    }
    .img-wrapper .img {
        width: 84.1%;
    }
    .sb-item:hover .img-wrapper .cover {
        opacity: 1;
    }
    .img-wrapper .cover {
        width: 84.1%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        transition: opacity 0.6s;
    }
    .desc .name,  .desc .time{
        width: 86%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .desc .name {
        font-size: 15px;
    }
    .desc .time {
        margin-top: 2px;
        font-size: 12px;
        color: #aaa;
    }
</style>
