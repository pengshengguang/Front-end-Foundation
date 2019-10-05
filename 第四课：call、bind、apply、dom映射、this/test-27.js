// sort深入研究
// var ary = [4,2,1,3,8,7,6,5,9,0,11,67,99,66,333,33];
var ary = [12,23,14,34,23,1,14,16,26,2];

// ary.sort(); //->这样只能处理10个以内的数字排序 10个以内的数

ary.sort(function (a, b) { // 方法里面传一个函数当做参数值，回调函数思想
    // console.log(a, b);
    // return a-b; // 升序（小->大）
    return 1;
})
console.log(ary);

// 二维数组
var ary = [
    {name: 'ldy', age: 24},
    {name: 'cjl', age: 23},
    {name: 'fsf', age: 44},
    {name: 'psg', age: 18},
]
// 现在的需求是，给上面的二维数组按照年龄小到大进行排序
ary.sort(function(a, b) {
    return parseFloat(a.age) - parseFloat(b.age);
});
console.log(ary);

// 现在的需求是，按照姓名进行排序!!!!!!
ary.sort(function(a, b) {
    return a.name.localeCompare(b.name);
});
console.log(ary);












