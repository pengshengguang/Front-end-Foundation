var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

var data = null;
// ->1、首先获取后台data.text中的数据->“JSON格式的字符串”->Ajax(async javascript and xml)
// 1)首先创建一个Ajax对象
var xhr = new XMLHttpRequest;
// 2)打开我们需要请求的数据的那个文件地址
xhr.open('get', 'json/data.txt', false); // false代表同步,4步执行完才能执行下面的代码
// 3)监听请求的状态
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
}
// 4)发送请求
xhr.send(null);

// ->2、实现我们的数据绑定
function  bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i]
        var oTr = document.createElement("tr");
        for (key in  cur) {
            var oTd = document.createElement("td");
            if (key === 'sex') {
                oTd.innerHTML = cur[key] === 0 ? '男' : '女';
            } else {
                oTd.innerHTML = cur[key];
            }
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bind();

// ->3、实现隔行变色
function  changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i%2 === 1 ? 'bg':null;
    }
}
changeBg();

// ->4、编写表格排序的方法：点击年龄实现由小到大排序
function sort(n) { // n是点击当前这一列的索引
    var that = this;
    that.flag = -1 * that.flag;
    for (var k = 0; k < oThs.length; k++) {
        if (this !== oThs[k]) {
            oThs[k].flag = 1;
        }
    }
    // 把存储所有行的类数组转化为数组
    var arr = utils.listToArray(oRows);
    // 给数组进行排序
    arr.sort(function(a, b) {
        // this -> window ,因为这里面是一个匿名函数，没有调用者，所有this就是windwo
        // 而sort函数里面的this，就是arr，两个不一样！！！！！！别混淆了！！！！！！
        var curInn = a.cells[n].innerHTML,
            nextInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(curInn),
            nextInnNum = parseFloat(nextInn);
        debugger;
        if (isNaN(curInn) || isNaN(nextInnNum)) {
            return curInn.localeCompare(nextInn) * that.flag;
        }
        return (curInnNum - nextInnNum) * that.flag;
    });
    // 将arr的最新排序，把每一行重新添加到tBody中
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        frg.appendChild(arr[i]);
    }
    tBody.appendChild(frg);
    frg = null;
}
// oThs[1].flag = 1;
// oThs[1].onclick = function() {
//     this.flag = -1 * this.flag;
//     sort.call(this);
// }

// ->5、点击排序，所有具有class="cursor"这个样式的th都能信息排序
for (var i = 0; i < oThs.length; i++) {
    var curTh = oThs[i];
    if (curTh.className === 'cursor') {
        curTh.index = i;
        curTh.flag = 1;
        curTh.onclick = function() {
            sort.call(this, this.index);
        }
    }
}

