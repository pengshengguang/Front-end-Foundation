function CreateJsPerson(name, age) {
	this.name = name;
	this.age = age;
	this.writeJs = function() {
		console.log("my name is " + this.name + ", i can write js.");
	}
}
var p1 = new CreateJsPerson("p1", 18);
var p2 = new CreateJsPerson("p2", 17);
p1.writeJs();
p2.writeJs();
console.log(p1.writeJs() === p2.writeJs()); //-> false
// 构造函数模式中拥有了类和实例的概念，并且实例和实例之间是相互独立开的
// -> 叫做实例识别


// 问题来了，两个实例里面的属性都是私有的以外，是不是还得有公有的部分？
// 现在我们的writeJs成为公有的，如下

CreateJsPerson.prototype.writeJsG = function() {
	console.log("my name is " + this.name + ", i can write js.");
};

console.log(p1.writeJsG() === p2.writeJsG()); //->true




// 为什么这样写，就能把属性变为公有的呢，下面说下
// 基于构造函数模式扩展出来的原型链模式
// 它解决了 方法或者属性公有的问题
// 即把实例之间公有的属性和方法提取成公有的属性和方法
// 想让谁公有，就把他放在prototype上即可



// 1、每一个函数数据类型（普通函数、类）都有一个天生自带的属性：prototype（原型），并且这个属性是一个对象数据类型的值
// 2、并且在prototype上浏览器天生给它加一个属性constructor（构造函数），属性值是当前函数（类）本身
// 3、每一个对象数据类型（普通的对象、实例、prototype...）也天生自带一个属性：__proto__，属性值是当前实例所属类的原型（prototype）




function Fn() {
	this.x = 100;
};
Fn.prototype.getX = function() {
	console.log(this.x);
};
var f1 = new Fn;
var f2 = new Fn;

// 堆内存：存储 对象、函数里面的代码字符串

console.log(Fn.prototype.constructor === Fn); //->true

// 2、Object是JS中所有对象数据类型的基类（最顶层的类）
//  1）f1 instanceof Object ->true 因为f1通过__proto__可以向上级查找，不管有多少级，最后总能找到Object
//  2）在Object.prototype上没有__proto__这个属性



// 3、原型链模式
// f1.hasOwnProperty("x");  //->hasWwnProperty是f1的一个属性
// 但是我们发现f1的私有属性上并没有这个方法，那如何处理的呢？
// 1）通过 对象名.属性名 的方式获取属性值的时候，首先在对象的私有的属性上进行查找，如果私有中存在这个属性，
// 则获取的是私有的属性值；
// 如果私有的没有，则通过__proto__找到所属类的原型（类的原型上定义的属性和方法都是当前实例的公有的属性和
// 方法），原型上存在的话，获取的是公有的属性值；
// 如果原型上也没有，则继续通过原型上的__proto__继续向上查找，一直找到Object.prototype为止...
// -->这种查找的机制就是我们的原型链模式

console.log(f1.getX === f2.getX); //->true
console.log(f1.__proto__.getX === f2.getX); //->true 
console.log(f1.getX === Fn.prototype.getX); //->true
// f1.getX 跟 f1.__proto__.getX的区别
// 前者是浏览器先找私有作用域，找不到再找公有作用域
// 后者是浏览器直接查找公有作用域
// 
console.log(f1.hasOwnProperty === f1.__proto__.__proto__.hasOwnProperty);

// 在IE浏览器中，我们原型模式也是同样的原理，但是IE浏览器怕你通过__proto__把公有的修改，
// 禁止我们使用__proto__，下面的例子就可以很明显的说明为啥IE禁止了

f1.sum == function() {
	//修改自己私有的sum
};
f1.__proto__.sum = function() {
	//修改所属类原型上的sum
};
// 所以修改公有的，IE只能通过prototype
Fn.prototype.sum = function() {
	// 修改公有的sum
};