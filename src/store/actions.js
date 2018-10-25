import * as types from './mutation-types'
import playMode from "../common/js/config";
import {shuffle} from "../common/js/util";

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.playMode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index]);
    } else {
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_PLAYING_STATE, true);
};

export const sequencePlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.sequence);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_PLAYLIST, list);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_PLAYING_STATE, true);
};

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    });
}
