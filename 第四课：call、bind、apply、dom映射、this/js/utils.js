// 配合test-26.js 、 test-28.js
// 为了与全局变量冲突，我们使用单例模式
var utils = {
  // 实现将类数组转化为数组方法（同时兼容非标准浏览器）
  listToArray: function(likeAry)   {
      var ary = [];
      try {
          ary = Array.prototype.slice.call(likeAry);
      } catch (e) {
          for (var i = 0; i < likeAry.length; i++) {
              ary[ary.length] = likeAry[i];
          }
      }
      return ary;
  },
  // jsonParse: 把JSON格式的字符串转化为JSON格式的对象
  jsonParse: function (str) {
      var val = null;
       try {
          val = JSON.parse(str);
      } catch (e) {
          val = eval('(' + str + ')');
      }
      return val;
  }
};