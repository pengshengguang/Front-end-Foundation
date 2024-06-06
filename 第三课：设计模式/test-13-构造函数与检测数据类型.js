// 工厂模式
function createJsPerson(name, age) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.writeJs = function() {
        console.log("My name is " + this.name + ", i can write js.");
    };
    return obj;
}
var p1 = createJsPerson("psg", 19);
p1.writeJs();

// 构造函数模式
// 目的是为了创建一个自定义类，并且创建这个类的实例
//
// 构造函数模式和工厂模式的区别？
// 1、执行的时候
// 普通函数执行-》createJsPerson() -》这时候，crateJsPerson这是一个普通函数名
// 构造函数模式-》new CreateJsPerson() -》通过new执行后，CreateJsPerson就是一个类了-》开头的大写是因为约定了，
// 大写开头就是表示一个类
// new 出来的返回值（p1），就是CreateJsPerson这个类的一个实例
//


// 创建一个数组
var ary = []; // 字面量方式
var arry = new Array(); // 实例创建的方式-》构造函数模式执行的方式


// js中，所有的类都是函数数据类型
// createJsPerson是函数数据类型，new CreateJsPerson也是函数数据类型，它通过new执行变成了一个类，但它本身也是一个普通的函数

// js中所有实例都是对象数据类型



function CreateJsPerson(name, age) {
    // var obj = {};
    this.name = name;
    this.age = age;
    this.writeJs = function() {
        console.log("My name is " + this.name + ", i can write js.");
    }
    // return obj;
}
var p2 = new CreateJsPerson("psg", 19);
p2.writeJs();



// 2、在函数代码执行的时候
// 相同：都是形成一个私有作用域，然后形参赋值-》预解释-》代码从上到下执行
//       类和普通函数一样，它也有普通函数的一面
// 不同点：在代码执行之前，不用自己再手动创建对象了，浏览器会默认的创建一个对象数据类型的值（类的一个实例）


function Fn() {
    var num = 10;
}
var obj = new Fn;
// console.log(num); // -> undefined
// 3、这里的num只是函数私有作用域里面的一个私有变量，它跟实例没有任何关系


function Fn() {
    var num = 10;
    // return 100
    return {name: 'psg'}
}
var f1 = new Fn;
console.log(f1);
// 4、在构造函数模式当中，浏览器会默认把我们的实例返回（返回的是一个对象数据类型的值）
// 但是如果我们手动返回值，分两种情况
// ******情况一，返回的是一个基本数据类型的值，当前实例不变
// 例如： return 100
// 那么浏览器返回的值仍然是浏览器默认创建的对象
// ******情况二，返回的是一个引用数据类型的值，当前实例会被自己返回的值覆盖掉
// 例如： return {name: "psg"}
// 那么原先浏览器返回的默认值，将会被自己的手动创建返回的对象给覆盖掉。注意，一定要是对象哦！

// 5、检测某一个实例是否属于这个类->instanceof
console.log(f1 instanceof Fn); // ->false , 因为f1不是浏览器创建的默认实例



function Fn1() {
    this.x = 100;
    this.getX = function() {
        console.log(this.x);
    }
}
var fun1 = new Fn1;
var fun2 = new Fn1;
console.log(fun1.getX() === fun2.getX());
// 6、fun1和fun2都是Fn1这个类的实例，都拥有x和getX这两个属性，但是这两个属性是各自私有的属性
// 但是如何检测某一个属性是否属于某一个实例
// in： 检测某一个属性是否属于某一个实例，不管是私有属性还是公有属性，用in都是用来检测这个属性是否属于这个对象
console.log("getX" in fun1); // -> true

// hasOwnProperty: 用来检测某个属性是否为这个对象的私有属性，这个方法只能检测私有的属性
console.log(fun1.hasOwnProperty("getX")); // -> true

// 思考，检测某一个属性是否为该对象的“公有属性”，自己写一个 hasPubProperty

function hasPubProperty(obj, attr) {
    // 首先保证它是一个对象的属性，并且不是私有属性，那就肯定就是公有属性了
    return ((attr in obj) && !obj.hasOwnProperty(attr));
}

console.log(hasPubProperty(fun1, "getX")); // -> false;










