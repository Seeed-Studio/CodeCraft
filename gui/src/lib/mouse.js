class Mouse {
    constructor() {
        this.isDown = false;
        this.x = 0;
        this.y = 0;
        this.event = null;
    }

    getClientX() {
        if (!this.event) return null;
        return this.event.clientX;
    }

    getClientY() {
        if (!this.event) return null;
        return this.event.clientY;
    }

    getDisplacementX() {
        if (!this.event) return null;
        return this.event.clientX - this.x;
    }

    getDisplacementY() {
        if (!this.event) return null;
        return this.event.clientY - this.y;
    }

    setEvent(e) {
        this.event = e || window.event;
    }

    start(e) {
        this.isDown = true;
        this.x = this.event.clientX;
        this.y = this.event.clientY;
    }

    stop() {
        this.isDown = false;
        this.x = 0;
        this.y = 0;
    }
}

export default new Mouse();