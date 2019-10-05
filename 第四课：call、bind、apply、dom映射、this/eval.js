//https://www.jianshu.com/p/d1afad1c76a9
//JS中eval()解析和为什么不要使用eval

// eval函数的作用是在当前作用域中执行一段javascript代码字符串。
//代码段1
var foo = 1;
function test1() {
    var foo = 2;
    eval('foo = 3');
}
test1(); //foo=3
console.log(foo); //f00=1

//但是，eval只在被直接调用并且调用的函数就是eval本身时，才在当前作用域中执行
//代码段2
var boo = 1;
function test2() {
    var boo = 2;
    var evalCopy = eval;
    evalCopy('boo = 3'); // 相当于 window.boo = 3;  eval.call(window, 'boo = 3');
}
test2(); //boo:2
console.log(boo); //boo:3