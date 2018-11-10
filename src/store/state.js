import playMode from '../common/js/config'
import {loadSearch} from "../common/js/cache";

const state = {
    singer: {},
    playingState: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    playMode: playMode.sequence,
    currentIndex: -1,
    songList: {},
    newDisc: {},
    searchHistory: loadSearch(),
    userFavorite: {}
};

export default state
