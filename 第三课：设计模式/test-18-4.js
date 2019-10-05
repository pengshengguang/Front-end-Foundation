// 冒充对象继承
// 把父类私有的+公有的克隆一份一模一样的 给子类私有的
function A() {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x);
};
function B() {
    // -> this->b
    var temp = new A; // 将A的实例当做普通对象来做遍历，这就是冒充对象
    for (var key in temp) {// 把父类A私有的和公有的，都复制过来给子类B私有的
        this[key] = temp[key];
    }
    temp = null;
}
var b = new B;
b.getX(); // ->x、getX