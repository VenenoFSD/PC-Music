import axios from 'axios'
const REQUEST_URL = 'http://localhost:3000';

export default function get (url, options = {}) {
    url = REQUEST_URL + url + optionsFormat(options);
    return axios.get(url).then((res) => {
        if (res.data && res.data.code === 200) {
            return Promise.resolve(res.data);
        }
    });
}

function optionsFormat(options) {
    let arr = [];
    for (let k in options) {
        arr.push(`${k}=${options[k]}`);
    }
    return arr.length ? `?${arr.join('&')}` : '';
}
