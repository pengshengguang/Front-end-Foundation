// exec ->正则的捕获
// 每一次捕获的时候都是先进行默认的匹配，如果没有匹配成功的，捕获的结果是null；
// 只有有匹配的内容我们才能捕获到；

// 捕获的内容格式
// 1)捕获到的内容是一个数组
//   数组中的第一项是当前正则捕获的内容
//   index: 捕获内容在字符串中开始的索引位置
//   input: 捕获的原始字符串

// 2) 正则捕获的特点
//   2.1、懒惰性-> 每一次执行exec支部或第一个匹配的内容，在不进行任何处理的情况下，再执行多次捕获
//             ，捕获的还是第一个匹配的内容
//     lastIndex: 是正则每一次捕获在字符串中开始查找的位置，默认值是0

var reg = /\d+/;
var str = "pengshengguang2019yanghuiru2020";
var res = reg.exec(str);
console.log(res); // ->[0:"2019", groups: undefined, index: 14, input: "pengshengguang2019yanghuiru2020"]



// 如何解决懒惰性？ ->在正则的末尾加一个修饰符“g”
// 修饰符有3个：img
// global(g): 全局匹配
// ignoreCase(i): 忽略大小写匹配
// multiline(m)：多行匹配
var regPlus = /\d+/g;
// console.log(regPlus.lastIndex); //-> 0
// console.log(regPlus.exec(str)); //-> ["2019", index: 14, input: "pengshengguang2019yanghuiru2020", groups: undefined]
// console.log(regPlus.lastIndex); //-> 18
// console.log(regPlus.exec(str)); //-> ["2020", index: 27, input: "pengshengguang2019yanghuiru2020", groups: undefined]
// console.log(regPlus.lastIndex); //-> 31
// console.log(regPlus.exec(str)); //-> null

// 一个需求，获取一个字符串里面的所有数值，上面的写法太繁琐，我们用循环
var arr = [];
var result = regPlus.exec(str);
while(result) {
    arr.push(result[0]);
    result = regPlus.exec(str);
}
console.log(arr);

// 注意，编写程序获取正则捕获的所有内容，一定不要忘记加g！！！！

//   2.2、贪婪性-> 正则的每一次捕获都是按照匹配最长的结果捕获，例如2符合正则，2015也符合正则，我们默认捕获2015
var reg = /\d+/g;
console.log(reg.exec(str)); //-> [0:2015 ......]
//        如何解决正则的贪婪性？ ->在量词元字符后面添加一个？即可
//           ? 在正则中有很多作用:
//             放在一个普通元字符后面，代表出现0-1次  /\d?/ -> 数字可能出现也可能不出现
//             放在一个量词元字符后面，代表取消捕获时候的贪婪性
var arr = [];
var reg = /\d+?/g;
var result = reg.exec(str);
while(result) {
    arr.push(result[0]);
    result = reg.exec(str);
}
console.log(arr); //->  ["2", "0", "1", "9", "2", "0", "2", "0"]


// reg.exec 方法，一次只能捕获一个，有没有别的办法，执行一次可捕获所有的呢？有!!
// 3）字符串中的match方法 ->把所有和正则匹配的字符都获取到
var reg = /\d+?/g;
var ary = str.match(reg);
console.log(ary); //->  ["2", "0", "1", "9", "2", "0", "2", "0"]

// 局限性
// 但是，exec能做的事情，match不一定能做到
// 虽然在当前的情况下match比exec更加好用简洁，但是match存在一些自身处理不了的问题：在分组捕获的时候，match只能捕获到大正则匹配的内容，而对小正则捕获的内容是无法获取的

