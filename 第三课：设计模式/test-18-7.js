// 周氏继承法
function avgFn() {
    Array.prototype.sort.call(arguments, function (a, b) {
        return a-b;
    });
    Array.prototype.pop.call(arguments);
    Array.prototype.shift.call(arguments);
    return (eval(Array.prototype.join.call(arguments, "+"))/arguments.length).toFixed(2);
}
console.log(avgFn(10,20,30,40,50));

//
function avgFn2() {
    arguments.__proto__ = Array.prototype;
    arguments.sort(function (a, b) {
        return a-b;
    });
    arguments.pop();
    arguments.shift();
    return (eval(arguments.join("+"))/arguments.length).toFixed(2);
}
console.log(avgFn2(10,20,30,40,50));