// 正则分组
// 1、改变优先级
// 2、分组引用
//    \2代表和第二个分组出现一模一样的内容; \1代表和第一个分组出现一模一样的内容
//    一模一样？意思是对应分组的值都要一模一样
var reg = /(\w)\1(\w)\2/;
console.log(reg.test('aa11')); // ->true
console.log(reg.test('aa1a')); // ->false

// 3、分组捕获 ->正则在捕获的时候，不仅仅把大正则匹配的内容捕获到，而且还可以把小分组的内容捕获到
// (?:) 在分组中?:的意思是只匹配不捕获
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(?:\d|X)$/
var str = '440825199401143074';
// console.log(reg.exec(str));
//->: "440825199401143074" ->大正则匹配的内容
// 1: "44"                 ->第一个分组捕获的内容
// 2: "0825"               ->第二个分组捕获的内容
// 3: "1994"
// 4: "01"
// 5: "14"
// 6: "30"
// 7: "7"
// 8: "4"   ------  这个就没有了，因为用了?:
// groups: undefined
// index: 0
// input: "440825199401143074"
// length: 9
// __proto__: Array(0)

// console.log(str.match(reg)); //->这样写和exec获取的结果是一样的！！！！！！！但是
var reg = /pengshengguang(\d+)/g;
var str = 'pengshengguang123pengshengguang456'
// 我们用exec执行两次，每一次不仅仅把大正则匹配获取到，而且还可以获取第一个分组匹配的内容
console.log(reg.exec(str)); // ["pengshengguang123", "123", index: 0, input: "pengshengguang123pengshengguang456", groups: undefined]
console.log(reg.exec(str)); // ["pengshengguang456", "456", index: 17, input: "pengshengguang123pengshengguang456", groups: undefined]
console.log(reg.exec(str)); // null

// 而match只能捕获大正则匹配的内容
console.log(str.match(reg)) // ["pengshengguang123", "pengshengguang456"]

// 为什么30行的match能够捕获到小正则，而39行的就只能捕获大正则呢？？？ 区别在于是否有g这个修饰符
// match 有g-> 不能捕获小正则
//       无g-> 大小正则都可捕获


// 网上资料
// exec是正则的方法，而match是string的方法
// exec与全局是否定义无关系，每次只匹配一个，而match则于全局相关联，当定义全局时，match将匹配所有的，当定义为非全局，两者执行结果相同；
