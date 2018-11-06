import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER] (state, singer) {
        state.singer = singer;
    },
    [types.SET_PLAYING_STATE] (state, flag) {
        state.playingState = flag;
    },
    [types.SET_FULL_SCREEN] (state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAYLIST] (state, list) {
        state.playlist = list;
    },
    [types.SET_SEQUENCE_LIST] (state, list) {
        state.sequenceList = list;
    },
    [types.SET_PLAY_MODE] (state, mode) {
        state.playMode = mode;
    },
    [types.SET_CURRENT_INDEX] (state, index) {
        state.currentIndex = index;
    },
    [types.SET_SONG_LIST] (state, list) {
        state.songList = list;
    },
    [types.SET_NEW_DISC] (state, disc) {
        state.newDisc = disc;
    },
    [types.SET_SEARCH_HISTORY] (state, history) {
        state.searchHistory = history;
    }
};

export default mutations
