// 如何查找当前作用域的上一级作用域？
// 看当前函数是哪个作用域下定义的，那么它的上级作用域就是谁 -> 和函数在哪执行的没有任何关系

var num = 12;
function fn() {
    var num = 120;
    return function () {
        console.log(num);
    };
}
var f = fn();
f();

~function () {
    var num = 1200;
    f();
}();