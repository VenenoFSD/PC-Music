import playMode from '../common/js/config'
import {loadSearch, loadPlay} from "../common/js/cache";

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
    userFavorite: {},
    playHistory: loadPlay()
};

export default state
