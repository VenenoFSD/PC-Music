<template>
    <div class="d-song-list">
        <div class="tags-wrapper">
            <div class="current-tag">{{currentTag}}</div>
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
    import {mapMutations} from 'vuex'
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
                        this.setSongListTags(this.songListTags);
                    }
                });
            },
            selectItem (item) {
                this.currentTag = item.name;
                this.$router.push(`/discovery/songList/${item.id}`);
            },
            ...mapMutations({
                setSongListTags: 'SET_SONG_LIST_TAGS'
            })
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
    .tags {
        display: flex;
    }
</style>
