// replace: 把原有的字符替换成新的字符
// 注意，在不使用正则的情况下，每执行一次只能替换一次
var str = "pengshengguang2020pengshengguang2021"
str = str.replace("peng","xiaopeng");
console.log(str); // -》xiaopengshengguang2020pengshengguang2021

// 那我要替换两次呢？可以链式调用吗？？？ 答案是错误的，没有实现需求
var str = "pengshengguang2020pengshengguang2021"
str = str.replace("peng","xiaopeng").replace("peng","xiaopeng");
console.log(str); // -》xiaoxiaopengshengguang2020pengshengguang2021

// 那现在我们使用正则
var str = "pengshengguang2020pengshengguang2021"
var reg = /peng/g
str = str.replace(reg, "xiaopeng");
console.log(str); // -》xiaopengshengguang2020xiaopengshengguang2021 ->需求已实现

// replace第一项的值是一个正则它的实现原理
// 首先我们和exec捕获一样，把所有和我们正则匹配的都捕获，然后把捕获的内容替换成我们需要替换的新内容
// -> /peng/g 按照这个正则把str中所有可以匹配的都捕获到，然后统一替换成我们的xiaopeng
var str = "pengshengguang2020pengshengguang2021"
str = str.replace(/peng/g, function () {
    console.log(arguments);
    // 第一次执行匿名函数的结果 ->  ["peng", 0, "pengshengguang2020pengshengguang2021", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    // 第二次执行匿名函数的结果 ->  ["peng", 18, "pengshengguang2020pengshengguang2021", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    return "xiaopeng"
})
// 如上面所示，replace第二个参数换成一个函数
// 1)匿名函数执行多少次，取决于正则匹配多少次
// 2)每一次执行匿名函数，里面传递的arguments和我们自己通过exec捕获的结果是非常类似的
// 3)return：你返回的内容是啥，就相当于把当前大正则捕获的内容替换成你返回的内容

var str = "pengshengguang2020pengshengguang2021"
str = str.replace(/(\d+)/g, function () {
    console.log(arguments[1]); //注意没有，正则加了个分组，arguments[1]，就是正则捕获的第一个分组  ()
    //console.log(RegExp.$1); //扩展知识，这种写法也是获取第一个分组内容
})

//应用题
var str = "20200715";
var ary = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖','拾'];
str = str.replace(/\d/g, function() {
    var num = arguments[0]
    return ary[num];
})
console.log(str);