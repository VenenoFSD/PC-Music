import playMode from '../common/js/config'

const state = {
    singer: {},
    playingState: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    playMode: playMode.sequence,
    currentIndex: -1,
    songList: {},
    newDisc: {}
};

export default state
