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

export const reloadMixin = {
    computed: {
        ...mapGetters([
            'loginInfo'
        ])
    },
    data () {
        return {
            reloadFlag: false
        }
    },
    watch: {
        loginInfo () {
            this.reloadFlag = true;
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.reloadFlag) {
                vm.reloadInfo();
                vm.reloadFlag = false;
            }
        });
    },
    methods: {
        reloadInfo () {
            throw new Error('reloadInfo is undefined in this component');
        }
    }
};
