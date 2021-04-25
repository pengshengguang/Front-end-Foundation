// 继续replace

// 正则的捕获: 正则的exec方法、字符串的match方法，字符串的replace方法

// replace: 将原有的字符替换成我们的新字符
// 1)在不使用正则的情况下，执行一次replace只能替换字符串中的一个
// 2)在使用正则的情况下，可以一次批量替换
//   ->原理：按照正则匹配的规则，到我们字符串中把正则匹配到的内容捕获到，然后每一次捕获，都把捕获的内容替换成新的内容
//     1)我们正则匹配到几次，function就执行几次
//     2)每一次执行function，我们都可以获取我们捕获的内容（这个内容跟我们使用exec捕获的内容非常相似）
//       arguments[0] -> exec捕获数组的第一项 -->大正则捕获的内容
//       arguments[1] -> exec捕获数组的index -->开始捕获的索引   (如果有分组，这个是第一个分组捕获的内容)
//       arguments[2] -> exec捕获数组的input -->捕获的原始字符串
//       不仅如此，我们小分组捕获的内容，在这里同样可以获取到
//     3)return: 把大正则捕获的内容，进行替换（跟小正则没有关系）

var str = "peng2019peng2020";
str = str.replace(/(peng)/g, function() {
    console.dir(arguments)
})

// 应用
// 1、获取一个字符中出现次数最多的字符，并获取出现的次数
// 1)
var str = "pengshenguangchongya";
var obj = {};
str.replace(/[a-z]/gi,   function() {
    var val = arguments[0];
    if (obj[val] >= 1) {
        obj[val] += 1;
    } else {
        obj[val] = 1
    }
})
console.log(obj)
// 2)获取最多出现的次数（假设法）
var maxNum = 0;
for (var key in obj) {
    obj[key] > maxNum ? maxNum = obj[key] : null;
}
// 3)把所有符合出现maxNum次数都获取到
var ary = [];
for (var key in obj) {
    obj[key] === maxNum ? ary.push(key) : null;
}
console.log("出现次数最多的字符是：" + ary.toString() + " ~出现了" + maxNum + " 次~")

//2、模板引擎实现的初步原理
var str = "My name is {0}, my age is {1}, i come from {2}, i love {3}~";
var ary =["PSG", 26, "China", "Javascript"];
str = str.replace(/{(\d+)}/g, function() {
    // return ary[arguments[1]];
    return ary[RegExp.$1];
});
console.log(str);

//3、var url = "http://kbs.sport.qq.com/kbsweb/game.html?mid=10000&cid=14670000&app=1.0";
//把URL中的参数获取到，并且保存如下格式：
// var obj = {
//     mid: "10000",
//     cid: "14670000",
//     app: "1.0"
// }

var url = "http://kbs.sport.qq.com/kbsweb/game.html?mid=10000&cid=14670000&app=1.0";
// 方法一：使用replace
var reg = /([^?=&]+)=([^?=&]+)/g;
var obj = {};
url.replace(reg, function () {
    console.log(arguments)
    obj[arguments[1]] = arguments[2]
})
console.log(obj)
// 方法二：使用exec
var reg = /([^?=&]+)=([^?=&]+)/g;
var obj = {};
var res = reg.exec(url);
while (res) {
    obj[res[1]] = res[2];
    res = reg.exec(url);
}
console.log(obj);
