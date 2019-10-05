function fn1() {console.log(1)}
function fn2() {console.log(2)}
// Function.prototype.myCall = function(context) {
// //     //1、让myCall的this中的函数体中的this，变成context
// //     this = eval(this.toString().replace('this', context));
// //     //2、让this执行
// //     this();
// }
// fn1.myCall(fn2);
fn1.call(fn2);
fn1.call.call(fn2);




