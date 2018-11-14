import Storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 100;

export const saveSearch = function (query) {
    let searches = Storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query;
    }, SEARCH_MAX_LENGTH);
    Storage.set(SEARCH_KEY, searches);
    return searches;
};

export const loadSearch = function () {
    return Storage.get(SEARCH_KEY, []);
};

export const deleteSearch = function (query) {
    let searches = Storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query;
    });
    Storage.set(SEARCH_KEY, searches);
    return searches;
};

export const clearSearch = function () {
    Storage.remove(SEARCH_KEY);
    return [];
};

export const savePlay = function (song) {
    let songs = Storage.get(PLAY_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, PLAY_MAX_LENGTH);
    Storage.set(PLAY_KEY, songs);
    return songs;
};

export const loadPlay = function () {
    return Storage.get(PLAY_KEY, []);
};

export const clearPlay = function () {
    Storage.remove(PLAY_KEY);
    return [];
};

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (maxLen && arr.length > maxLen) {
        arr.pop();
    }
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
