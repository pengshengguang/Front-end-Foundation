var num = 20;
var obj = {
    num: 30,
    fn: (function (num) { // num -> window.num  这一步错了，num是立即执行函数的私有变量，即为20
        this.num *= 3; // this -> window -> window.num = 20 * 3 = 60
        num += 15; // nu    m -> window.num = 60 + 15 = 75    这一步也错了，num是私有变量20，所以num -> me.num = 20 + 15 = 35
        var num =45; // 因为私有变量num已经在私有变量变量赋值阶段已经声明了并赋值了，所以这个var num不需要预解释，直接覆盖形参，所以num -> me.num = 45
        return function () {
            this.num *= 4;
            num += 20;
            console.log(num);
        }
    })(num)
};

// 其实这道题的关键点就是，函数执行中，部分内存被外面的变量所引用，此函数作用域不销毁
// 因此
// 立即执行函数的私有变量num = 45 （函数栈内存不销毁，因为立即执行函数return了一个堆内存给了obj.fn）
// 全局作用域下面的num = 60

var fn = obj.fn;
fn(); // this -> window -> this.num -> window.num = 60 * 4 = 240 ;  num -> 不是私有变量，所以往上找，是立即自行函数的私有变量，所以，num = 45+20=65

// 此时
// 立即执行函数的私有变量num = 65
// 全局作用域下面的num = 240
// obj.num依然是30


obj.fn(); // this -> obj -> this.num -> obj.num * 4 = 30 * 4 = 120 ； num -> 立即执行函数的形参 65 -> num = 65 + 20 = 85
// 此时
// 立即执行函数的私有变量num = 85
// 全局作用域下面的num = 240
// obj.num是 this.num * 4 = 30 * 4 = 120

console.log(window.num, obj.num); // 240, 120































