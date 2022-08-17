class SnapshotSandbox {
    constructor() {
        this.proxy = window
        this.modifyPropsMap = {}
        this.active()
    }
    active() {
        this.windowSnapshot = {}
        for (const prop in window) {
            if (window.hasOwnProperty(prop)) {
                this.windowSnapshot[prop] = window[prop]
            }
        }
        Object.keys(this.modifyPropsMap).forEach(p => {
            window[p] = this.modifyPropsMap[p]
        })
    }
    inactive() {
        for (const prop in window) { //包括原型上的
            if (window.hasOwnProperty(prop)) {// 忽略原型上的
                if (window[prop] !== this.windowSnapshot[prop]) {
                    this.modifyPropsMap[prop] = window[prop]
                    window[prop] = this.windowSnapshot[prop]
                }
            }
        }
    }
}

let sandBox = new SnapshotSandbox();

(() => { })(sandBox.proxy)