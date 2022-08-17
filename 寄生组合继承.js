

function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype)
    subType.prototype = prototype
    prototype.constructor = subType
}

function Supertype(name) {
    this.name = name
    this.colors = ['', '']
}

Supertype.prototype.sayName = function () {
    console.log(this.name)
}

function SubType(name, age) {
    Supertype.call(this, name)
    this.age = age
}

inheritPrototype(SubType, Supertype)

const newSub = new SubType('123')

newSub.sayName()

