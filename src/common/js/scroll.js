let clientHeight = 0,
    songListHeight = 0,
    scrollTop = 0,
    hTimer = null;

export default function scrollToEnd(outer, inner, getMore) {
    clearTimeout(hTimer);
    hTimer = setTimeout(() => {
        clientHeight = outer.clientHeight;
        scrollTop = outer.scrollTop;
        songListHeight = inner.offsetHeight;
        if ((clientHeight + scrollTop >= songListHeight)) {
            getMore();
        }
    }, 200);
}
