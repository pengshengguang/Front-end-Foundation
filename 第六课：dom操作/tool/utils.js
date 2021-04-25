// 配合test-26.js 、 test-28.js
// 为了与全局变量冲突，我们使用单例模式

// 使用惰性思想（JS高阶编程技巧之一）来封装我常用的方法库
// 第一次再给utils赋值的时候我们就已经把兼容处理好了，把最后的结构存放在flag变量中，以后在每一个方法中，只要是IE6-8不兼容的，我们不需要重新检测，只需要使用flag
// 的值即可
var utils = (function() {
    var flag = "getComputedStyle" in window; // ->flag这个变量不销毁，存储的是判断当前的浏览器是否兼容getComputedStyle，兼容的话是标准浏览器，否则是IE6-8

    // 实现将类数组转化为数组方法（同时兼容非标准浏览器）
    function listToArray(likeAry)   {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }

    // jsonParse: 把JSON格式的字符串转化为JSON格式的对象
    function jsonParse(str) {
        var val = null;
        try {
            val = JSON.parse(str);
        } catch (e) {
            val = eval('(' + str + ')');
        }
        return val;
    }

    function getCss2SS(curEle, attr) {
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
    }

    function offset(curEle) {
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
    }

    function win(attr, value) {
        if (value === undefined) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    // 获取当前容器下面的元素子节点（谷歌浏览器直接用children就行了，不用考虑兼容问题）
    // 如果只传递tagName，可以在获取集合中进行二次筛选
    function children(curEle, tagName) {
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

    // ->prev: 获取上一个哥哥元素节点
    // ->首先获取当前元素的上一个哥哥节点，判断是否为元素节点，不是的话基于当前继续找上面的哥哥节点，一直找到元素哥哥节点为止，如果没有返回null即可
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) { //nodeType: 1->代表元素；2->代表属性；3->代表文本内容
            pre = pre.previousSibling;
        }
        return pre;
    }

    // ->next：获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }

    // ->prevAll: 获取所有哥哥元素节点
    function preAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            // ary.push(pre); // 这里不能用push，因为这样顺序就会颠倒
            ary.unshift(pre); // 每一次添加都放在最开头
            pre = this.prev(pre);
        }
        return ary;
    }

    // ->nextAll: 获取所有弟弟元素节点
    function nextAll(curEle) {
        var ary = [];
        var next = this.next(curEle);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    }

    // ->sibling: 获取相邻的两个元素节点
    function sibling(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        var next = this.next(curEle);
        pre ? ary.push(pre) : null;
        next ? ary.push(next) : null;
        return ary;
    }

    // ->siblings: 获取所有的元素节点（即所有的哥哥+所有的弟弟）
    function siblings(curEle) {
        return this.preAll(curEle).concat(this.nextAll(curEle));
    }

    // -> index: 获取当前元素索引
    function index(curEle) {
        return this.preAll(curEle).length;
    }

    // -> firstChild: 获取当前元素的第一个元素子节点
    function firstChild(curEle) {
        var childs = this.children(curEle);
        return childs.length > 0 ? childs[0] : null;
    }

    // -> lastChild: 获取当前元素的最后一个元素子节点
    function lastChild(curEle) {
        var childs = this.children(curEle);
        return childs.length > 0 ? childs[childs.length - 1] : null;
    }

    return {
        listToArray:listToArray,
        jsonParse: jsonParse,
        getCss2SS : getCss2SS,
        offset : offset,
        win : win,

        // 获取兄弟元素节点系列方法
        children: children,
        prev: prev,
        next: next,
        preAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        firstChild: firstChild,
        lastChild: lastChild,

    }
})();