// 设计一个完善的响应式系统

let activeEffect  // 告别硬编码
const bucket = new WeakMap()

function effect(fn) {
    activeEffect = fn
    fn()// 执行fn时，会取obj的属性，从而触发get
}

// 将effect函数放入一个桶中
const data = { text: 'hello' }

const obj = new Proxy(data, {
    get(target, key) {
        if (!activeEffect) return target[key]
        let depsMap = bucket.get(target)
        if (!depsMap) {
            bucket.set(target, depsMap = new Map())
        }
        let deps = depsMap.get(key)
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        deps.add(activeEffect)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        const depsMap = bucket.get(target)
        if (!depsMap) return
        const deps = depsMap.get(key)
        if (!deps) return
        deps.forEach(effect => effect())
    }
})

effect(() => {
    console.log(obj.text)
})

obj.text = 'world'
obj.name = 'webster' 