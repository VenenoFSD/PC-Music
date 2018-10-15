<template>
    <div class="d-new-disc-wrapper" ref="dNewDiscWrapper" @scroll="handleScroll">
        <div class="d-new-disc" v-show="showDisc" ref="dNewDisc">
            <ul class="new-disc">
                <li class="nd-item" v-for="item in newDisc">
                    <div class="img-wrapper">
                        <img v-lazy="item.picUrl" class="img">
                        <div class="cover"></div>
                    </div>
                    <div class="desc">
                        <p class="name">{{item.name}}</p>
                        <p class="singer">{{item.artist.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <load v-show="showLoad"></load>
        <continue-load v-show="showDisc && hasMore"></continue-load>
    </div>
</template>

<script>
    import Load from '../../base/load/Load'
    import ContinueLoad from '../../base/continue-load/ContinueLoad'
    import axios from 'axios'

    const DEFAULT_DISC_COUNT = 25;
    let clientHeight = 0,
        songListHeight = 0,
        scrollTop = 0;

    export default {
        name: "DNewDisc",
        data () {
            return {
                newDisc: [],
                offset: 0,
                showLoad: true,
                showDisc: false,
                hasMore: false,
                total: 0,
                canLoad: true
            }
        },
        methods: {
            firstGet () {
                axios.get(`http://localhost:3000/top/album?limit=${DEFAULT_DISC_COUNT}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.newDisc = res.data.albums;
                        this.total = res.data.total;
                    }
                });
            },
            getMore () {
                if (!this.hasMore) {
                    return;
                }
                let timer = null;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    axios.get(`http://localhost:3000/top/album?limit=${DEFAULT_DISC_COUNT}&offset=${this.offset}`).then((res) => {
                        if (res.data && res.data.code === 200) {
                            this.newDisc = this.newDisc.concat(res.data.albums);
                            this.canLoad = true;
                        }
                    });
                }, 2000);
            },
            handleScroll () {
                let timer = null;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.scrollToEnd();
                }, 300);
            },
            scrollToEnd () {
                clientHeight = window.innerHeight;
                songListHeight = this.$refs.dNewDisc.offsetHeight;
                scrollTop = this.$refs.dNewDiscWrapper.scrollTop;
                if ((clientHeight + scrollTop >= songListHeight) && this.canLoad) {
                    this.canLoad = false;
                    this.getMore();
                }
            }
        },
        watch: {
            newDisc () {
                this.offset = this.newDisc.length;
                if (this.offset < this.total) {
                    this.hasMore = true;
                }
            }
        },
        created () {
            this.firstGet();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showLoad = false;
                this.showDisc = true;
            }, 2000);
        },
        components: {
            Load,
            ContinueLoad
        }
    }
</script>

<style scoped>
    .d-new-disc-wrapper {
        flex: 1;
        overflow: auto;
    }
    .d-new-disc {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .new-disc {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .nd-item {
        width: 16.8%;
        flex: 0 0 16.8%;
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
    .nd-item:hover .img-wrapper .cover {
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
    .desc .name,  .desc .singer{
        width: 86%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

    }
    .desc .name {
        font-size: 15px;
    }
    .desc .singer {
        margin-top: 2px;
        font-size: 12px;
        color: #aaa;
    }
</style>
