<template>
    <div>
        <div class="progress-bar-desc">
            <p class="song-desc">{{songName}}<span class="desc-normal"> - {{artistsFormat(artistName)}}</span></p>
            <p class="time-desc">00:00<span class="desc-normal"> / {{durationFormat(durationTime)}}</span></p>
        </div>
        <div class="progress-bar">
            <div class="progress"></div>
            <div class="progress-btn">
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: {
            songName: {
                type: String,
                default: ''
            },
            artistName: {
                type: Array,
                default: []
            },
            durationTime: {
                type: Number,
                default: 0
            }
        },
        methods: {
            artistsFormat (artists) {
                let arr = [];
                for (let i = 0; i < artists.length; i++) {
                    arr.push(artists[i].name);
                }
                return arr.join(' / ');
            },
            durationFormat (time) {
                time = time / 1000 | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            }
        }
    }
</script>

<style scoped>
    .progress-bar-desc {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
    .progress-bar-desc .desc-normal {
        color: #ccc;
    }
    .progress-bar {
        width: 100%;
        height: 2px;
        background-color: #ccc;
        margin: 20px 0 10px 0;
        position: relative;
    }
    .progress-bar .progress {
        position: absolute;
        height: 100%;
        width: 100px;
        left: 0;
        top: 0;
        background-color: #c73d3b;
    }
    .progress-bar .progress-btn {
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        left: 91px;
        top: -8px;
        background-color: #eee;
    }
    .progress-btn span {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #c73d3b;
        position: absolute;
        top: 7px;
        left: 7px;
    }
</style>
