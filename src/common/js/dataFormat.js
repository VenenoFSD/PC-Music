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

export function artistsFormat (artists, wide = false) {
    let arr = [];
    for (let i = 0; i < artists.length; i++) {
        arr.push(artists[i].name);
    }
    return wide ? arr.join(' / ') : arr.join('/');
}

export function durationFormat (time, longFlag = true) {
    time = longFlag ? time / 1000 | 0 : time | 0;
    let minute = time / 60 | 0;
    let second = pad(time % 60);
    return `${minute}:${second}`;
}

export function songFormat (songs) {
    let result = [];
    for (let i = 0; i < songs.length; i++) {
        result.push({
            name: songs[i].name,
            id: songs[i].id,
            al: songs[i].album,
            ar: songs[i].artists,
            dt: songs[i].duration,
            alia: songs[i].alias
        });
    }
    return result;
}

export function timeFormat(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
}

function pad (num) {
    return num < 10 ? '0' + num : num;
}
