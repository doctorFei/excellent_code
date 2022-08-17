class ProxyShandbox {
    constructor() {
        const rawWindow = window
        const fakeWindow = {}
        const proxy = new proxy(fakeWindow, {
            set(target, key, value) {
                target[key] = value
                return value
            },
            get(target, key) {
                return target[key] || rawWindow[key]
            }
        })
    }
}


function aa() { console.log( Array.prototype.slice.call(arguments)) }

aa(4, ...[1, 2, 3], 7)