import Storage from 'good-storage'

const SEARCH_KEY = '__search__';
const MAX_LENGTH = 15;

export const saveSearch = function (query) {
    let searches = Storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query;
    }, MAX_LENGTH);
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
