import {mapGetters} from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted () {
        this.handlePlaylist(this.playlist);
    },
    activated () {
        this.handlePlaylist(this.playlist);
    },
    watch: {
        playlist (newList) {
            this.handlePlaylist(newList);
        }
    },
    methods: {
        handlePlaylist () {
            throw new Error('handlePlaylist is undefined in this component');
        }
    }
};
