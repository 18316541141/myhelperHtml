/**
 * 自定义的浮点数范围校验规则
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} decimalCount 小数位数（-1表示不设置小数位限制）
 * @param {*} message 校验不过输出内容
 */
export default function (min, max, decimalCount, message) {
    return function (rule, value, callback) {
        if (value === undefined || value === null || value === "") {
            callback();
        } else {
            if (isNaN(value)) {
                callback(message.replace("{0}", min).replace("{1}", max));
            } else {
                if (decimalCount !== -1) {
                    var numStr = parseFloat(value).toString();
                    if (numStr.indexOf('.') > -1 && numStr.length - numStr.indexOf('.') - 1 > decimalCount) {
                        callback(message.replace("{0}", min).replace("{1}", max));
                    }
                }
            }
            var numVal = parseFloat(value);
            if (numVal >= min && numVal <= max) {
                callback();
            } else {
                callback(message.replace("{0}", min).replace("{1}", max));
            }
        }
    };
}