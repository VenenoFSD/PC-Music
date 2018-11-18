import playMode from '../common/js/config'
import {loadSearch, loadPlay} from "../common/js/cache";

const state = {
    singer: {},

    //  播放相关
    playingState: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    playMode: playMode.sequence,
    currentIndex: -1,
    isFM: false,

    songList: {},
    newDisc: {},
    searchHistory: loadSearch(),
    userFavorite: {},
    playHistory: loadPlay(),
    loginStatus: false
};

export default state
