// 对象数据类型的作用
// 把描述同一个事物（同一个对象）的属性和方法放在一个内存空间下，起到了分组的作用，这样不同事物之间的属性即使属
// 性名相同，相互也不会发生冲突
// -》我们把这种分组编写代码的模式叫做“单例模式”
// -》在单例模式中我们把person1或者person2叫做命名空间
var person1 = {
    "name": "psg",
    age: 24
};
console.log(person1.name);
console.log(person1.age);

// 单例模式是一种项目开发中经常使用的模式，因为项目中我们可以使用单例模式进行“模块化开发”
// “模块化开发”：对于一个相对来说比较大的项目，需要多人协助开发，我们一般会根据当前需求划分成几个功能模块，每人
// 负责一部分，同时开发，最后把每个人的代码进行合并

// searchRender是一个命名空间
var searchRender = {
    change: function() {
        this.clickEvent(); // 这里的this你看不出来是谁，因为只有执行的时候，才知道
    },
    clickEvent: function() {

    }
};
// 但是要想使用change，必须得这样调用
searchRender.clickEvent();
// 所以在clickEvent（）里面，this只能是searchRender
// 这里使用this的好处是，当命名空间改名字的时候，并不用改里面的调用者，因为this就代表了命名空间


// 总结：单例模式解决了分组的问题
// 但是，单例模式的弊端是仍旧是手工作业模式，效率比较低，工作模式就是为了解决这个问题的
// 工厂模式就是批量生产
// 单例模式是对象，工厂模式是函数

// 工厂模式：把实现同一件事情的相同代码放到同一个函数中，以后如果再想实现这个功能，就不需要重新编写这些代码了，
//         只需要执行当前函数即可————》函数的封装——》即低耦合（相同），高内聚（减少代码的冗余代码，提高代码利用率）

 function createJsPerson(name, age) {
     var obj = {};
     obj.name = name;
     obj.age = age;
     obj.writeJs = function () {
         console.log("My name is " + name + ", i can write Js.")
     };
     return obj;
 }

// 所有的编程语言都是面向对象开发的——》类的继承、封装、多态
// 继承：子类继承父类中的属性和方法
// 多态：当前方法的多种形态（后台语言中，多态包含重载和重写）
