var oBtn = document.getElementById("btn");
var spanNum = document.getElementById("spanNum");
// 1、利用全局作用域不销毁的原理，把需要累加的数字定义为全局变量
var count = 0;
oBtn.onclick = function () {
    count ++;
    spanNum.innerText = count;
};
    // 弊端，在项目中为了防止全局变量之间的冲突，我们一般是禁止或者减少使用全局变量的

// 2、自行形成一个不销毁的私有作用域保存我们需要累积的数据
// (function () {
//     var count = 0;
//     oBtn.onclick = function () {
//         ++count;
//         spanNum.innerText = count;
//     }
// })();
// 为什么这样，06里面说过函数不销毁的3种方式，其中有一个就是在私有作用里面给dom对象绑定了一个事件，该私有作用域不销毁

// 另外下面还有一个写法，也是不销毁的
// oBtn.onclick = (function () {
//     var count = 0;
//     return function () {
//         count++;
//         spanNum.innerText = count;
//     }
// })();
// 弊端： 有一个不销毁的私有作用域，占那么一丢丢内存

// 3、利用innerHTML的方式处理：每一次点击的时候都要先到页面中获取最新的值，然后累加，最后把累加结果重新放回去
// oBtn.onclick = function () {
//     // spanNum.innerHTML获取的页面中的内容返回的是一个字符串
//     spanNum.innerHTML++;
// };
// 弊端： 每一次都需要把页面中的内容先转换为字符串，然后累加，累加完再重新添加回去，当重新的添加的时候浏览器倒要重新渲染一下
// innerHTML获取的时候本来就需要浏览器去处理的


// 4、利用自定义属性存储（推荐）
// oBtn.count = 0;  // 这个count既不是全局变量，也不是私有变量，它就是oBtn的一个属性
// oBtn.onclick = function () {
//     spanNum.innerText = ++this.count;
// };
// 注意：这里的count只是一个对象的属性，它既不是全局变量，也不是局部变量，它只是一个对象的属性