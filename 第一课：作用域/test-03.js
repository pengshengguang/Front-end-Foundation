// 全局变量的细节问题

// 在全局作用域中，带var 和 不带var 的关系？
// 区别：带var的可以进行预解释，所以在赋值前面执行不会报错；不带var是不能进行预解释，在前面执行会报错
// console.log(num1); // -> undefined
// var num1 = 1;
//
// console.log(num2); // -> Uncaught ReferenceError: num2 is not defined
// num2 = 2;


// 由于window对象同时扮演着ECMAScript中Global对象的角色，因此所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。

// 区别：
// num2 = 2 （相当于给window增加一个叫做num2的属性名，属性值是2）
// var num1 = 1 （相当于给全局作用域增加了一个全局变量num1，但是不仅如此，它也相当于给window增加了一个属性名num1，属性值是12）

// var num1 = 1;
// // console.log(num1); // -> 1
// //
// // num2 = 2;
// // console.log(num2); // -> 2
