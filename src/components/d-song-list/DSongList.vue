<template>
    <div class="d-song-list-wrapper" ref="dSongListWrapper" @scroll="handleScroll">
        <div class="d-song-list">
            <div class="tags-wrapper">
                <div class="current-tag">{{currentTag}}<span class="right">&gt;</span></div>
                <ul class="tags">
                    <li v-for="item in songListTags" class="tags-item" @click="selectItem(item)">{{item.name}}</li>
                </ul>
            </div>
            <keep-alive>
                <router-view :currentTag="currentTag" ref="songList"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "DSongList",
        data () {
            return {
                songListTags: [],
                songLists: [],
                currentTag: ''
            }
        },
        methods: {
            getSongListTag () {
                axios.get('http://localhost:3000/playlist/hot').then((res) => {
                    if (res.data && res.data.code === 200) {
                        let tags = res.data.tags;
                        for (let i = 0; i < tags.length; i++) {
                            let obj = {};
                            obj.name = tags[i].name;
                            obj.id = tags[i].id;
                            this.songListTags.push(obj);
                        }
                        this.currentTag = this.songListTags[0].name;
                        this.$router.push(`/discovery/songList/${this.songListTags[0].id}`);
                    }
                });
            },
            selectItem (item) {
                this.currentTag = item.name;
                this.$router.push(`/discovery/songList/${item.id}`);
            },
            getMore () {
                this.$refs.songList.getMore();
            },
            handleScroll () {
                this.$refs.dSongListWrapper.addEventListener('scroll', () => {
                    console.log(1);
                });
            }
        },
        created () {
            this.getSongListTag();
        }
    }
</script>

<style scoped>
    .d-song-list {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .tags-wrapper {
        margin-bottom: 35px;
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .current-tag {
        padding: 2px 8px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #000;
        font-size: 13px;
        white-space: nowrap;
    }
    .current-tag .right {
        margin-left: 3px;
        color: #666;
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
    }
    .tags .tags-item {
        padding: 4px 24px;
        border-right: 1px solid #ddd;
        height: 12px;
        line-height: 12px;
    }
    .tags .tags-item:last-child {
        border: none;
    }
</style>
