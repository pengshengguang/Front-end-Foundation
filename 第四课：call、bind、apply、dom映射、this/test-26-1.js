// 问题来了，怎么知道哪些浏览器兼容，哪些不兼容呢？
// 解决方法，浏览器异常信息捕获（try...catch）

// console.log(num); // ->Uncaught ReferenceError: num is not defined
// console.log('OK'); // 由于浏览器的机制，上面的代码报错了，后面的代码就都终止执行了
console.log(num);
try {
    console.log(num);
} catch (e) { // ->形参必须要写，我们一般起名为e
    console.log('OK');
    console.log(e.message); // ->可以收集当前代码报错的原因  ->num is not defined
    // ->手动抛出一条错误信息，终止代码执行!!!!!!!!!!!!如果没有这句话，下面的第19行代码是可以执行的！！！！！
    throw new Error('当前网络繁忙，请稍后再试')
    // 下面这三种是常见的详细错误信息类
    // new ReferenceError() ->引用错误
    // new TypeError ->类型错误
    // new RangerError ->范围错误
}
console.log('ok');
// 后台中经常用来做错误日志，把错误日志收集起来










