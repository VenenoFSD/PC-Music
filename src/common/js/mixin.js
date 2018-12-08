import {mapGetters} from 'vuex'
import {debounce} from "./util";
import Load from '../../base/load/Load'
import NoResult from '../../base/no-result/NoResult'
import get from './api'

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

export const delayShowMixin = {
    data () {
        return {
            showLoad: true,
            showContent: false
        }
    },
    methods: {
        delayShow (load, delay) {
            load();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showLoad = false;
                this.showContent = true;
            }, delay);
        }
    }
};

export const searchMixin = {
    data () {
        return {
            show: false,
            result: [],
            NoResult: false,
            showLoad: true,
            showList: false
        }
    },
    props: {
        currentType: {
            type: Object,
            default: {
                index: 0,
                code: 1
            }
        },
        query: {
            type: String,
            default: ''
        },
    },
    methods: {
        getSearch(timer, code, type, countType) {
            get('/search', {
                keywords: this.query,
                type: code,
                limit: 30
            }).then((res) => {
                this.result = res.result[type];
                this.NoResult = !res.result[countType];
                if (!this.NoResult) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.showList = true;
                        this.showLoad = false;
                    }, 1500);
                } else {
                    this.showLoad = false;
                }
            });
        },
        _getSearch () {
            throw new Error('_getSearch() is not defined!');
        },
        _delayShow (timer) {
            this.showList = false;
            this.showLoad = true;
            this._getSearch(timer);
        },
    },
    watch: {
        show (newShow) {
            if (newShow) {
                this._delayShow(this.timer_1);
            }
        }
    },
    created () {
        this.timer_1 = null;
        this.timer_2 = null;
        this.$watch('query', debounce((newQuery) => {
            if (this.show && newQuery.length) {
                this._delayShow(this.timer_2);
            }
        }, 300));
    },
    components: {
        Load,
        NoResult
    }
};
