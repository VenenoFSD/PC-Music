export function playCountFormat (playCount) {
    playCount = Math.floor(playCount);
    if (playCount < 100000) {
        return playCount;
    } else {
        playCount = playCount.toString();
        let len = playCount.length;
        let cutLen = len - 4;
        return playCount.substr(0, cutLen) + '万';
    }
}

export function rankFormat(index) {
    return index < 9 ? '0' + (index + 1) : index + 1;
}
