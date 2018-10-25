<template>
    <div class="pb-wrapper"
         @mousemove.prevent="mouseMove"
         @mouseup="mouseEnd">
        <div class="pb-content">
            <div class="progress-bar-desc">
                <p class="song-desc">{{songName}}<span class="desc-normal"> - {{artistsFormat(artistName)}}</span></p>
                <p class="time-desc">{{currentTimeFormat(currentTime)}}<span class="desc-normal"> / {{durationFormat(durationTime)}}</span></p>
            </div>
            <div class="pb" @click="progressClick">
                <div class="progress-bar" ref="progressBar">
                    <div class="progress" ref="progress"></div>
                    <div class="progress-btn" ref="progressBtn"
                         @mousedown.prevent="mouseStart"></div>
                </div>
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
                default: () => []
            },
            durationTime: {
                type: Number,
                default: 0
            },
            currentTime: {
                type: Number,
                default: 0
            },
            percent: {
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
            currentTimeFormat (time) {
                time = time | 0;
                let minute = time / 60 | 0;
                let second = this._pad(time % 60);
                return `${minute}:${second}`;
            },
            mouseStart (e) {
                this.touch.initiated = true;
                this.touch.startX = e.screenX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            mouseMove (e) {
                if (!this.touch.initiated) {
                    return;
                }
                let deltaX = e.screenX - this.touch.startX;
                let offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX));
                this._offset(offsetWidth);
            },
            mouseEnd () {
                if (!this.touch.initiated) {
                    return;
                }
                this.touch.initiated = false;
                this._triggerPercent();
            },
            progressClick (e) {
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._offset(offsetWidth);
                this._triggerPercent();
            },
            _pad (num) {
                return num < 10 ? '0' + num : num;
            },
            _offset (offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`;
                this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
            },
            _triggerPercent () {
                let newPercent =  this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth;
                this.$emit('percentChange', newPercent);
            }
        },
        created () {
            this.touch = {};
        },
        watch: {
            percent (newPercent) {
                if (newPercent >= 0 && !this.touch.initiated) {
                    let barWidth = this.$refs.progressBar.clientWidth;
                    this._offset(barWidth * newPercent);
                }
            }
        }
    }
</script>

<style scoped>
    .pb-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .pb-content {
        flex: 1;
    }
    .progress-bar-desc {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #333;
    }
    .progress-bar-desc .desc-normal {
        color: #555;
    }
    .pb {
        width: 100%;
        margin-top: 10px;
        padding: 10px 0;
    }
    .progress-bar {
        width: 100%;
        height: 2px;
        background-color: #ccc;
        position: relative;
    }
    .progress-bar .progress {
        position: absolute;
        height: 100%;
        width: 0;
        left: 0;
        top: 0;
        background-color: #c73d3b;
    }
    .progress-bar .progress-btn {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        left: -8px;
        top: -7px;
        border: 6px solid #ddd;
        background-color: #b03836;
    }
</style>
