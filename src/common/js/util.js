//  洗牌函数
export function shuffle(arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomIndex(0, i);
        let temp = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = temp;
    }
    return _arr;
}

function getRandomIndex(min, max) {  //  区间[min, max]，Math.random为[0, 1)
    return (Math.random() * (max - min + 1) + min) | 0;
}

//  防抖函数
export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}
