// Array.prototype.slice = function(){};
var arr = [12,23,34];
// arr.slice -> arr这个实例通过原型链的查找机制找到Array.prototype上的slice方法
// arr.slice() -> 表示找到slice方法并且执行，在执行slice方法过程中，才把arr数组进行截取

// Function.prototype.call=function(){}
// fn.call(); // 表示fn通过原型查找机制找到
// 了Function.prototype.call这个方法并且让它执行
var obj = {name: 'psg'};
function fn() { // fn是Function一个实例
    console.log(this);
}
fn(); // this->window
// 现在我想要this是obj
// obj.fn(); // -> Uncaught TypeError: obj.fn is not a function

fn.call(obj);
// call方法原理
// ->首先我们让原型上的call方法执行，在执行call方法的时候，我们让fn方法中的this变为第一个参数值obj；然后再把fn这个函数执行

// 自己模拟实现一个call方法
Function.prototype.myCall = function(context) {
    // ->1、让fn中的this关键字变为context的值->obj
    eval(this.toString().replace('this', 'context'));
    // ->2、让fn方法执行
    this();
};

// 练习一
function fn1() {console.log(1);}
function fn2() {console.log(2);}
fn1.call(fn2); // ->1    原理：首先fn1通过原型链机制找到Function.prototype上的call方法，并且让call方法执行->
// 此时call这个方法中的this就是fn1，在call方法执行过程中，让fn1中this关键字变成fn2，然后让fn1执行

fn1.call.call(fn2); // -> 首先fn1通过原型链机制找到Function.prototype上的call方法，然后再让call方法通过原型找到
// Function.prototype原型上的call（因为fn.call这个东西也是个函数数据类型），在第二次找到call时，让call方法执行，此时
// 的this是fn1.call。

// 首先让call方法里面的this（fn1.call）变为fn2，然后再让fn1.call执行
fn1.call();

















