var a = {}
Object.defineProperty(a, 'query', {
    get() {
        return this.c
    }
})

var b = Object.create(a)
b.c = 2

console.log(b.query)

Object.defineProperty(prop, 'query', {
    get(){
        return this.response.query
    }
})