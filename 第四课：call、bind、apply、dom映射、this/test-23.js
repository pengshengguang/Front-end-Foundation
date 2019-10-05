// 'use strict'; // ->告诉当前浏览器接下来的JS代码将会严格按照严格模式进行编写

var obj = {name: 'psg'};
function fn(num1, num2) {
    console.log(num1+num2);
    console.log(this);
}

// 值得注意的是，call里面，第一个参数就是要变成this的对象！！
fn(100,200); //this->window  num1=100; num2=200
fn.call(100, 200); // this -> 100 , num1=200, num2=undefined
fn.call(obj, 100, 200); // this->obj, num1=100, num2=200

// 值得注意的是，call里面，第一个参数如果是空、null、undefined，就会导致this为window
fn.call(); //this->windows  在严格模式下，this-> undefined
fn.call(null); //this->windows  在严格模式下，this-> null
fn.call(undefined); //this->windows 在严格模式下，this-> undefined
// 总结，在严格模式下，传谁，this就是谁，不传，this就是undefined


// apply
// apply和call方法的作用都是一模一样的，都是用来改变方法的this关键字并且把方法执行；而且
// 在严格模式下和非严格模式下对于第一个参数是null/undefined这种情况的规律也是一样的
fn.call(obj, 100, 200);
fn.apply(obj, [100, 200]); //-> call再给fn传递参数的时候，是一个个传递值得，而apply不是一个个传，而是
// 把要给fn传递的参数统一的放在一个数组中进行操作（但是也相对于一个个的给fn的形参赋值）
// 总结，call于apply的区别其实只是语法的区别，其他完全一样

// bind
// 这个方法在IE6-8下不兼容
// 作用：和call、apply类似，都是用来改变this关键字的
fn.call(obj, 100, 200);
fn.bind(obj, 100, 200); // 只是改变了fn中的this为obj，并且给fn传递了两个参数值，但是此时并没有给fn这个函数执行。
                        // 但是，执行bind会有一个返回值，这个返回值myFn就是我们把fn的this改变后的那个结果！！！

//那么，如何让fn这个函数执行呢，下面的写法就行解决方法
var myFn = fn.bind(obj, 100, 200);
myFn();
// bind体现了js的预处理思想
// ->预处理：实现把fn的this改变为我们想要的结果，并且把对应的参数值也准备好，以后要用到了，直接的执行即可

// 视频的最后，有this的总结！！！！！