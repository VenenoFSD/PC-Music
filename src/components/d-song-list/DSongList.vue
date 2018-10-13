<template>
    <div class="d-song-list">
        <div class="tags-wrapper">
            <div class="current-tag">{{currentTag}}<span class="right">&gt;</span></div>
            <ul class="tags">
                <li v-for="item in songListTags" class="tags-item" @click="selectItem(item)">{{item.name}}</li>
            </ul>
        </div>
        <keep-alive>
            <router-view :currentTag="currentTag"></router-view>
        </keep-alive>
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
        transform: translate3d(4px, 0, 0);
        padding: 0 20px;
    }
    .tags-wrapper {
        margin: 30px 0 40px 0;
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
    }
    .current-tag .right {
        margin-left: 3px;
        color: #666;
    }
    .tags {
        display: flex;
    }
    .tags .tags-item {
        padding: 0 24px;
        border-right: 1px solid #ddd;
        height: 12px;
        line-height: 12px;
    }
    .tags .tags-item:last-child {
        border: none;
    }
</style>
