import * as types from './mutation-types'

const mutations = {
    [types.SET_SONG_LIST_TAGS] (state, tags) {
        state.songListTags = tags;
    }
};

export default mutations
