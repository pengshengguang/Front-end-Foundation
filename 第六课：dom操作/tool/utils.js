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
    },
    // 获取当前容器下面的元素子节点（谷歌浏览器直接用children就行了，不用考虑兼容问题）
    // 如果只传递tagName，可以在获取集合中进行二次筛选
    children: function (curEle, tagName) {
        // 首先获取所有的子节点（childNodes）
        // 再所有的子节点中，把元素节点过滤出来（nodeType ===1）
        var ary = [];
        if (/MSIE (6|7|8)/i.test(navigator.userAgent)) { //IE6-8不能使用内置的children属性，需要自己写代码实现
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
            }
            nodeList = null;
        } else { //->标准浏览器中，我们直接使用children即可，但是这样获取的是一个元素集合（类数组），为了和IE6-8下保持一直
            // 我们接祖数组原型上面的slice，实现把类数组转为数组
            // ary = curEle.children; 不能这样返回，因为这样返回的是类数组而不是数组
            ary = this.listToArray(curEle.childNodes); // 为什么可以this就调用utils呢，因为，你想调用children这个方法，你必须
                                                         // 得utils.children()这样调用，所以this就是等于utils
        }

        //-> 二次筛选
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length;  k++) {
                var curEleNode = ary[k];
                if (curEleNode.tagName.toLowerCase() !== tagName.toLowerCase()) {
                    // ->不是我想要的标签
                    ary.splice(k, 1);
                    k--;
                }
            }
        }

        return ary
    }
};