// 1. 全局中直接调用方法，它里面的this指向的是windows
// function test() {
//     console.log(this)
// }
// test();

// 2. 当使用严格模式的时候，在全局中之间调用的方法返回的是undefined
// 将use strict放进立即执行函数是为了防止全局受到严格的污染
// (function () {
//     "use strict";
//     console.log(this)
// })();

// 3. 当一个方法作为一个函数的属性的时候，它里面的this就是指向这个对象
// var obj = {
//     name: "psg",
//     foo: function () {
//         console.log(this.name);
//     }
// };
// obj.foo();

// 4. 3的例子还可以这样变化一下,
// 注意，js中一切皆对象，test变量名指向的是function{}里面的函数体,而不是test（）
// function test() {
//     console.log(this.name);
// }
// var obj = {
//     name: 'psg',
//     foo: test
// };
// obj.foo();

// 5. 当一个对象里面的方法 地址 赋值给了全局变量的时候，这个方法已经跟这个对象没什么关系了。
// 因为全局边浪直接指向这个方法，这时候，就是纯粹的函数调用，和例子1一样了
// var obj = {
//     name: 'psg',
//     foo: function() {
//         console.log(this)
//     }
// };
// var test = obj.foo;
// test();

// 6.
var obj = {
    name: 'psg',
    foo: function () {
        console.log(this);
    },
    foo2: function () {
        console.log(this);
        setTimeout(this.foo, 1000);
    }
};
obj.foo2();

