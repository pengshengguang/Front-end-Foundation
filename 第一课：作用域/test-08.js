// 我们在js中主要研究的都是函数中的tihs
// JS中的this代表的是当前行为的执行主体; JS中的context代表的是当前行为执行的环境（区域）；
//
// 例如男神在北理珠吃饭，吃饭是函数，男神是函数的主体，北理珠就是当前行为的执行环境（context）
// 主体跟上下文没有必然的联系，主体只跟函数有关系，
// 就好像男神吃饭，其实在哪里都可以吃饭，吃饭这个动作主体永远都是男神，环境却是可以变化的。
debugger;
console.log(this);
function eat() {
    console.log('男神在进步！');
    console.log(this);
}
~function () {
    eat();
}();

// this是谁和函数在哪里定义和在哪执行都没有任何关系，如何区分this？
// 1、函数执行，首先看函数名前面是否有“.”，有的话，“.”前面是谁，this就是谁；没有的话this就是window
function fn() {
    console.log(this);
}
var obj = {fn: fn};
fn();
obj.fn();

function sum() {
    fn();
}
sum();

var oo = {
    sum: function () {
        fn();
    }
};
oo.sum(); // -> window

// 你以为的，你以为，就是你以为的

// 2、立即执行函数中的this永远都是this
(function() {
    console.log(this);
})();


// 3、给元素的某一个事件绑定方法，当事件触发的时候，执行对应的方法，方法中的this是当前元素
setTimeout(function() {
    // document.getElementById("div1").onclick = fn; // -> dom元素
    document.getElementById("div1").onclick = function () {
        // -> this -> #div1
        console.log(this);
        fn(); // -> 根据第一条和第三条，this指向的是windows
    }
}, 0);

// 找到函数在哪里执行的，有点，this就是点前面的东西；没点，this就是window ！！！！！