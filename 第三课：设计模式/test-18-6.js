// 寄生组合式继承
function A() {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x);
};
function B() {
    // ->this->b
    A.call(this);
}
// B.prototype = Object.create(A.prototype); // 意思是把父类的原型，给了子类的原型
// Object.create创建了一个对象，并且把这个新对象的原型指向了a的原型，然后B的原型指向了这个新对象
B.prototype = objectCreate(A.prototype);
B.prototype.constructor = B;
var b = new B;
console.log(b);

function objectCreate(o) {
    function Fn() {}
    Fn.prototype=o;
    return new Fn;
}

// 这种方式跟原型继承有区别
// 原型继承是把父类私有的+公有的属性和方法，给了子类的公有上
// 寄生组合式继承是把父类私有的清空，用原型链的方式，把子类的原型指向一个新对象，这个新对象的原型再指向父类的原型（比较绕，得看图）
















