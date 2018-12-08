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

export function artistsFormat (artists) {
    let arr = [];
    for (let i = 0; i < artists.length; i++) {
        arr.push(artists[i].name);
    }
    return arr.join('/');
}

export function durationFormat (time) {
    time = time / 1000 | 0;
    let minute = time / 60 | 0;
    let second = pad(time % 60);
    return `${minute}:${second}`;
}

function pad (num) {
    return num < 10 ? '0' + num : num;
}
