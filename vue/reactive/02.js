// 设计一个完善的响应式系统

let activeEffect  // 告别硬编码

function effect(fn) {
    activeEffect = fn
    fn()// 执行fn时，会取obj的属性，从而触发get
}

// 将effect函数放入一个桶中
const bucket = new Set()
const data = { text: 'hello' }

const obj = new Proxy(data, {
    get(target, key) {
        if (activeEffect) {
            bucket.add(activeEffect)
        }
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        bucket.forEach(effect => effect())
    }
})

effect(() => {
    console.log(obj.text)
})

obj.text = 'world'

obj.name = 'webster' // 这个属性不应该触发副作用