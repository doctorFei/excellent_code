
// 最基本的响应式
function effect() {
    console.log(obj.text)
}

// 将effect函数放入一个桶中
const bucket = new Set()
const data = { text: 'hello' }

const obj = new Proxy(data, {
    get(target, key) {
        bucket.add(effect)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        bucket.forEach(effect => effect())
    }
})

effect()

obj.text = 'world'