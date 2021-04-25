var arr = [1,2,3,4,5,6,7]
var copyArr = deepClone(arr);
console.log(copyArr);
function deepClone(obj) {
    if (typeof obj !== 'object' || typeof obj == null) {
        return obj;
    }
    // 初始化返回结果
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (let key in obj) {
        // 保证key不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key])
        }
    }
    // 结果返回
    return result
}