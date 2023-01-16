
const defaultOpt = {
    controls: true,
    autoplay: false,
    bigPlayButton: false,
    controlBar: {
        // 是否显示播放、暂停切换按钮
        playToggle: true,
        // 是否显示播放进度条  
        progressControl: true,
        // 是否显示音量控制
        volumePanel: false,
        // 是否显示视频当前时间
        currentTimeDisplay: false,
        // 是否显示视频时长
        durationDisplay: false,
        // 是否显示时间分割符
        timeDivider: false,
        // 是否显示播放速率选择按钮
        playbackRateMenuButton: false,
        // 是否显示全屏按钮
        fullscreenToggle: false,
        // 是否显示清晰度切换菜单
        QualitySwitcherMenuButton: false
    }
}
class Player {
    constructor() {
        this.player = null;
    }

    init(containerId, option) {
        if (TCPlayer) {
            this.player = TCPlayer(containerId, { ...defaultOpt, ...option });
        }
    }

    /**
     * 设置播放器初始化完成后的回调
     */
    ready(callback) {
        return this.player && this.player.ready(callback);
    }

    /**
     * 播放以及恢复播放
     */
    play() {
        return this.player && this.player.play();
    }

    /**
     * 暂停播放
     */
    pause() {
        return this.player && this.player.pause();
    }

    /**
     * 获取当前播放时间点，或者设置播放时间点，该时间点不能超过视频时长
     */
    currentTime(seconds) {
        return this.player && this.player.currentTime(seconds);
    }

    /**
     * 获取视频时长
     */
    duration() {
        return this.player && this.player.duration();
    }

    /**
     * 获取或设置播放器音量 0-1
     */
    volume(percent) {
        return this.player && this.player.volume(percent);
    }

    /**
     * 获取或设置播放器封面
     */
    poster(src) {
        return this.player && this.player.poster(src);
    }

    /**
     * 进入全屏模式
     */
    requestFullscreen() {
        return this.player && this.player.requestFullscreen();
    }

    /**
     * 退出全屏模式
     */
    exitFullscreen() {
        return this.player && this.player.exitFullscreen();
    }

    /**
     * 返回是否进入了全屏模式
     */
    isFullscreen() {
        return this.player && this.player.isFullscreen();
    }

    /**
     * 监听事件
     */
    on(type, listerner) {
        return this.player && this.player.on(type, listerner);
    }

    /**
     * 监听事件，事件处理函数最多只执行 1 次
     */
    one(type, listerner) {
        return this.player && this.player.one(type, listerner);
    }

    /**
     * 解绑事件监听
     */
    off(type, listerner) {
        return this.player && this.player.off(type, listerner);
    }

    /**
     * 返回视频缓冲区间
     */
    buffered() {
        return this.player && this.player.buffered();
    }

    /**
     * 返回缓冲长度占视频时长的百分比
     */
    bufferedPercent() {
        return this.player && this.player.bufferedPercent();
    }

    /**
     * 销毁播放器
     */
    dispose() {
        if (!this.player) return;
        this.player.dispose();
        this.player = null;
    }

}


export default new Player();