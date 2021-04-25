// 数据类型检测的四种方式

//1、typeof 用来检测数据类型的运算符
console.log(typeof 12); //->number
console.log(typeof "peng"); //->string
console.log(typeof {}); //->object
// 使用typeof检测数据类型，首先返回的都是一个字符串，其次字符串中包含了对应的数据类型
// 例如：”number“，”string“，”boolean“，“undefined”，“function”， “object”

// 局限性:
// ->typeof numm ->"object"
// ->不能具体细分是数组、正则、日期，还是对象中其他的值，因为用type检测数据类型，对于对象数据类型，最后返回的结果都是“object”

//2、instanceof 检测某一个实例是否属于某个类
var obj = [18,27];
console.log(obj instanceof Array);
console.log(obj instanceof RegExp);

// 局限性(哇咔咔，好多)
// 1、不能用来检测和处理字面量方式创建出来的基本数据类型值
// ->对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建出来的结果是有一定区别的:
//   从严格意义上来说，只有实例创建出来的结果才是标准的对象数据类型值，也是标准的Number这个类的一个实例
//                 对于字面量方式创建出来的结果是基本的数据类型值，不是严谨的实例，但是由于JS的松散特点，导致了可以使用Number.prototype上提供的方法
console.log(1 instanceof Number);
console.log(new Number(1) instanceof Number);
// 2、instanceof的特性：只要在当前实例的原型链上面，我们用其检测出来的结果都是true
var ary = [];
console.log(ary instanceof Array); //->true
console.log(ary instanceof Object); //->true
// 对于dom也是一样的
var oDiv = document.getElementById("div1");
//oDiv -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype
console.log(oDiv instanceof EventTarget);
console.log(oDiv instanceof Node);
console.log(oDiv instanceof Object);

// 为了证明第二点，可以用原型继承
function Fn() {}
var ary = new Array;
Fn.prototype = new Array; //->原型继承：让子类的原型等于父类的一个实例
var f = new Fn;
// f.__proto__ -> Fn.prototype == ary --> ary.__proto__ == Array.prototype
console.log(f instanceof Array);


//3、contructor 构造函数  作用和instanceof非常相似
var obj = [];
console.log(obj.constructor === Array); // true
console.log(obj.constructor === RegExp); // false
// ->constructor可以处理基本数据类型的检测
var num = 1;
console.log(num.constructor === Number); // true
var reg = /\d+/g;
console.log(reg.constructor === RegExp); // true
console.log(reg.constructor === Object); // false  !!!! 如果只说这里，是比instanceof好的
// ->局限性：
//   我们可以把类的原型进行重写，在重写的过程中很有可能出现把之前的constructor给覆盖，这样检测出来的结果是不准确的
function Fn() {}
Fn.prototype = new Array;
var f = new Fn;
console.log(f.constructor); // ->Array

// ->局限性二：
//   对于特殊的数据类型null和undefined，他们所属的类是Null和Undefined，但是浏览器把这两个类保护起来了，不允许我们在外面访问使用
//   这一点instanceof、constructor是一样存在的


//4、Object.prototype.toString.call()    最常用最准确的方式
// Object.prototype.toString 它的作用是返回当前方法执行主体（方法中this）所属类的详细信息！！！！！！
var obj = {"name":"psg"};
console.log(obj.toString()); //->[object Object]
// 第一个object代表当前实例是对象数据类型的（固定写死）
// 第二个object代表的是obj所属类是Object
console.log('---------------------------------------------');
console.log(Object.prototype.toString.call(1));      //->[object Number]
console.log(Object.prototype.toString.call('psg'));  //->[object String]
console.log(Object.prototype.toString.call(true));   //->[object Boolean]
console.log(Object.prototype.toString.call(null));   //->[object Null]
console.log(Object.prototype.toString.call(undefined));   //->[object Undefined]
console.log(Object.prototype.toString.call(new Date()));  //->[object Date]
console.log(Object.prototype.toString.call(obj));     //-> [object Object]
console.log(Object.prototype.toString.call(/^$/));    //-> [object RegExp]
console.log(Object.prototype.toString.call([]));      //-> [object Array]
console.log(Object.prototype.toString.call(function(){}));  //-> [object Function]
console.log('---------------------------------------------');
//5、对toString的理解
// ->Number.prototype.toString()
// 1.可以转化为字符串
console.log((10).toString()); // "10"
// 2、转化为数字进制
console.log((10).toString(2)); // 1010  转为2进制
console.log((10).toString(8)); // 12  转为8进制
console.log((10).toString(10)); // 10  转为10进制
// ->Object.prototype.toString()
console.log({'name': 'psg'}.toString()); // [object Object]
