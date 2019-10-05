// 1、正则：就是一个规则，判断一个字符串是否符合这个规则（正则就是用来处理字符串的
// 处理：
// 1）匹配   判断一个字符串是否符合我们制定的规则 -》 使用test来实现
// var reg = /\d/; // -> 包含一个0-9之间的一个数字
// console.log(reg.test("彭胜光")); // -> false
// console.log(reg.test("1111")); // -> true
// console.log(reg.test("彭胜光1111")); // -> true

// 2）捕获   把字符串中符合我们正则规则的内容捕获到 -》 使用exec来实现
// var reg = /\d/; // -> 包含一个0-9之间的一个数字
// console.log(reg.exec("彭胜光")); // -> null
// console.log(reg.exec("1111")); // -> ["1", index: 0, input: "1111", groups: undefined]
// console.log(reg.exec("彭胜光1111")); // -> ["1", index: 3, input: "彭胜光1111", groups: undefined]

// 2、如何创建一个正则？
// 字面量方式：
var reg = /\d/;  // 创建对象，字面量方式  var obj = {}

// 实例创建方式：
var reg = new RegExp("");  // 创建对象，实例创建方式 var obj = new Object();

// 对象两种创建方式是没区别的，但是正则两种创建方式是有区别的!!!!

// 3、如何学习正则：
console.dir(RegExp.prototype);