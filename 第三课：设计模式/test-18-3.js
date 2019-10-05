// call继承
// -> 把父类私有的属性和方法，克隆一份一模一样的，作为子类私有的属性
function A() { // 一个函数，它有三种角色：1、普通函数（私有作用域）；2、类（new）；3、普通对象（__proto__）
    this.x = 100;
    this.a = function () {
        console.log(this.x);
    }
}
A.prototype.getX = function () {
    console.log(this.x);
};
function B() {
    this.y = 100;
    // this->b
    A.call(this);// ->A.call(b) 把A执行，让A中的this变为了n！！！
    //此时的A.prototype对B类来说是没用的，因为B没有继承A
}
var b = new B;
console.log(b.x); // ->100
b.a(); // ->100
b.getX();// ->b.getX is not a function

