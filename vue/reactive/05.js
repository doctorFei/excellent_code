// 分支切换与cleanup


// 每次分支切换时，需要清除上一次的effect
// 也就是重新搜集依赖，副作用被执行后，就从相应的依赖中移除，然后重新收

let activeEffect  // 告别硬编码
const bucket = new WeakMap()

function effect(fn) {

    function effectFn() {
        cleanup(effectFn)
        activeEffect = effectFn
        fn()// 执行fn时，会取obj的属性，从而触发get
    }

    effectFn.deps = []

    effectFn()
}

// 将effect函数放入一个桶中
const data = { ok: true, text: 'hello' }

const obj = new Proxy(data, {
    get(target, key) {
        // 依赖收集
        track(target, key)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        // 触发更新
        trigger(target, key)
    }
})



function track(target, key) {
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) {
        bucket.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, deps = new Set())
    }
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}


function trigger(target, key) {
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const deps = depsMap.get(key)
    if (!deps) return

    // !important 下面注释的方法会导致死循环
    // deps.forEach(effect => effect())

    const effectTorun = new Set(deps)
    effectTorun.forEach(effect => effect())
}

function cleanup(effectFn) {
    for (let deps of effectFn.deps) {
        deps.delete(effectFn)
    }
    effectFn.deps = []
}





//****************************************************** */


effect(() => {
    console.log(obj.ok ? obj.text : 'not ok')
})

obj.ok = false


