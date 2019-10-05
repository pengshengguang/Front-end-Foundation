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
  },

  getCss2SS : function(curEle, attr) {
      var val = null, reg = null;
      if ('getComputedStyle' in window) {
          val = window.getComputedStyle(curEle, null)[attr];
      } else {
          if (attr === 'opacity') {
              val = curEle.currentStyle[attr]; // ->返回 alpha(opacity=10)
              reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;  //  获取10这个数字
              val = reg.test(val)?reg.exec(val)[1]/100:1  // 超厉害，test与exec一起使用！！！
          }
          val = curEle.currentStyle[attr];
      }
      reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i; //匹配的情况：纯数值或者带单位的数值
      return reg.test(val) ? parseFloat(val) : val;
  },

  offset : function(curEle) {
      var totalLeft = null,
          totalTop = null,
          par = curEle.offsetParent;
      // 首先把自己本身的进行累加
      totalLeft += curEle.offsetLeft;
      totalTop += curEle.offsetTop;

      while (par) {
          if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
              // 累加父级参照物边框
              totalTop += par.clientTop;
              totalLeft += par.clientLeft;
          }
          // 累加父级参照物本身的偏移
          totalTop += par.offsetTop;
          totalLeft += par.offsetLeft;
          par = par.offsetParent;
      }
      console.log('offsetTop: ' + totalTop + ', offsetLeft: ' + totalLeft);
      var result = {};
      result.offsetTop = totalTop;
      result.offsetLeft = totalLeft;
      return result;
  },

  win : function(attr, value) {
      if (value === undefined) {
          return document.documentElement[attr] || document.body[attr];
      }
      document.documentElement[attr] = value;
      document.body[attr] = value;
  }
};