// JSON不是单独的数据类型，它是一种特殊的数据格式

// 在IE6-7浏览器中，我们的window下没有JSON对象，刚才的parse和stringify都不存在
// 那么在这种情况下，怎么去读取JSON格式的数据呢?

var str = '{"name": "psg", "age": 25 }';
var obj = eval('(' + str + ')'); //一定要记住，使用eval解析json数据，一定要手动添加小括号，不然eval无法识别这个是json格式字符串
console.log(obj);