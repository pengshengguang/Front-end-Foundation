// 原型模式（基于构造函数模式）

// 构造函数模式中拥有了类和实例的概念，并且类和实例之间是相互独立开发的->这在JS中叫“实例识别” （生活中叫品牌区分）
function createPerson (name, age) {
    this.name = name;
    this.age = age;
    // this.writeJs = function() {
    //     console.log("My name is " + this.name + ", I can write Js.");
    // }
}
createPerson.prototype.writeJs = function() {
    console.log("My name is " + this.name + ", I can write Js.");
};
var p1 = new createPerson('psg', 18);
var p2 = new createPerson('wxb', 17);
debugger;
console.log(p1.writeJs === p2.writeJs); // -> true    说明这是公有的方法，所以相等

// 构造函数模式中拥有了类和实例的概念，并且实例和实例之间是相互独立开来的->实例识别
// 基于构造函数模式的原型模式解决了方法或者属性公有的问题-》把实例之间相同的属性和方法提取成公有的属性和方法-》
// -》想让谁公有就把它放在CreatePerson.prototype上
// 下面的每一句话，都不要问为什么,因为这是js设定的东西
// 1、每一个函数数据类型（普通函数、类）都有一个天生自带的属性：prototype（原型），并且这个属性是一个对象数据类型的值
// 2、并且在prototype上浏览器天生给它加一个属性constructor（构造函数），属性值是当前函数（类）本身
// 3、每一个对象数据类型（普通的对象、实例、prototype...）也天生自带一个属性：__proto__，属性值是当前所属类的原型（prototype）

function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function() {
    console.log(this.x);
};
var f1 = new Fn;
var f2 = new Fn;
console.log(Fn.prototype.constructor === Fn); //-> true

// object是所有对象数据类型的基类，object的prototype指向的对象，没有__proto__，
// 因为根据上面第二点，object的prototype指向的对象，这个对象的所属类就是object，
// object的原型就是指向此对象，自己指向自己，没意思啊！
// （简单来说：在object.prototype（对象）上没有__proto__这个属性）

