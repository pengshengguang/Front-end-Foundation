// 获取数组最大值
var ary = [4,2,18,6,20,1,3,88];

// 方法一，排序输出最大最小
ary.sort(function(a, b) {
    return a-b;
});
var max = ary[ary.length - 1];
var min = ary[0];
console.log(min, max);

// 方法二，假设法
var max = ary[0];
var min = ary[0];
for (var i = 0; i < ary.length; i++) {
    // max = (max < ary[i] ? ary[i] : null); 这种写法是错的，老哥！！！
    // min = (min > ary[i] ? ary[i] : null);
    max < ary[i] ? max = ary[i] : null;  //  这才才是正确的写法，老哥！！！
    min > ary[i] ? min = ary[i] : null;
}
console.log(min, max);

// 方法三、使用Math.max、Math.min 方法实现，结合eval
//  注意，Math.min/max，传参是一个个传的，不能整个数组传过去
// eval 作用： 把字符串变成表达式并执行
var max = eval('Math.max(' + ary.toString() + ')');
var min = eval('Math.min(' + ary.toString() + ')');
console.log(min, max);

// 方法四、依旧使用Math.max/min，但是这次结合apply，把ary作为参数传进去
var  max = Math.max.apply(null, ary); // this->windows
var  min = Math.min.apply(null, ary); // this->windows， 这是23课的知识点！！！
console.log(min, max);

