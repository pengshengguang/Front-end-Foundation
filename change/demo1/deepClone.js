/*
 * @Description: 
 * @version: 
 * @Author: PSG
 * @Date: 2021-04-25 13:58:40
 * @LastEditors: PSG
 * @LastEditTime: 2021-09-19 17:14:07
 */
var arr = [1,2,3,4,5,6,7]
var copyArr = deepClone(arr);
console.log(copyArr);
function deepClone(obj) {
    if (typeof obj !== 'object' || obj == null) {
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