/**
 * 自定义的整数范围校验规则
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} message 校验不过输出内容
 */
export default function (min, max, message) {
    return function (rule, value, callback) {
        if (value === undefined || value === null || value === '') {
            callback();
        } else {
            var numVal = parseInt(value);
            var valStr = (value + '').replace(/^0*/, '');
            if ((numVal + '' === valStr || valStr === '') && numVal >= min && numVal <= max) {
                callback();
            } else {
                callback(message.replace('{0}', min).replace('{1}', max));
            }
        }
    }
}