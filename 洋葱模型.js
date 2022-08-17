const middleware = []
let mw1 = async function (ctx, next) {
    console.log("next前，第一个中间件")
    next()
    console.log("next后，第一个中间件")
}
let mw2 = async function (ctx, next) {
    // return next()
    console.log("next前，第二个中间件")
    next()
    console.log("next后，第二个中间件")
}
let mw3 = async function (ctx, next) {
    console.log("第三个中间件，没有next了")
}


function use(mw) {
    middleware.push(mw)
}

use(mw1)
use(mw2)
use(mw3)

function compose(middlewares) {
    return function () {
        return dispatch(0);
        // 执⾏第0个
        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve();
            }
            // 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
            return Promise.resolve(
                fn(null, function next() {
                    // promise 完成后，再执⾏下⼀个
                    return dispatch(i + 1);
                })
            );
        }
    }
}

compose(middleware)()