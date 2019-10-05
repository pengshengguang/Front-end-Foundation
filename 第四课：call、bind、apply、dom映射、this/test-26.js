// 类数组转换为数组
function fn() {
    var ary = [].slice.call(arguments);
}

// 获取页面上的五个div
var oList = document.getElementsByTagName('div');
console.dir(oList); //-> HTMLCollection(5) 元素集合类的一个实例，它也是一个类数组集合（有索引，有length）

oList = document.getElementsByName('psg');
console.log(oList); //->NodeList [] 节点集合 -> 也是类数组集合

// 把元素集合类数组转化为数组
var arr = Array.prototype.slice.call(oList); //->在IE6~8，不支持类数组转化为数组，报“Array.prototype.slice: 'this' 不是 JavaScript 对象”错误
console.log(arr);//-> 但是arguments借用数组方法是不存在浏览器兼容的问题哦
// 标准浏览器：IE9以上，谷歌、火狐

// ->标准
var arr = Array.prototype.slice.call(oList);
console.log(arr);

// ->非标准 (兼容)
for (var i = 0; i < oList.length; i++) {
    arr[arr.length] = oList[i];
}

// 问题来了，怎么知道哪些浏览器兼容，哪些不兼容呢？
// 解决方法，浏览器异常信息捕获（try...catch）








