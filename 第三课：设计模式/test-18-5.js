// 混合模式继承
// 原型继承 + call继承
function A() {
    tihs.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x)
};
function B() {
    A.call(this); // ->这一步，即等于： x=100
}
B.prototype = new A; // ->这一步，即等于：B.prototype: x=100 getX=....
B.prototype.constructor = B;
var b = new B;
b.getX();

// 这种方法，将A这个大类，执行了两次
// 这里，把父类的私有复制了两遍，一个是父类的私有，给了子类的私有；一个是父类的私有+公有，给了子类的公有，
// 也就是说重复了一个私有的



