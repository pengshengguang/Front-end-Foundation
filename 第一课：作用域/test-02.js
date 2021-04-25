// 作用域链
// 1、 当函数执行的时候（直接目的：让函数体中的代码执行），首先会形成一个新的私有作用域，然后按照如下步骤执行：
// 1） 如果有形参，先给形参赋值
// 2） 进行私有作用域中的预解释
// 3） 私有作用域中的代码从上到下执行
// 结果，

// 私有变量只有两种情况：
// 1）在函数中var过
// 2）是函数私有变量

console.log(total); // ->undefined
var total = 0;
function fn(num1, num2) {
    console.log(total); // ->0
    total = num1 + num2;
    console.log(total); // ->300
}
fn(100, 200);
console.log(total);  // ->300