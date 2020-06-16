/**
 * uri格式校验
 * @param {*} message 校验不过输出内容
 */
export default function (message) {
    return function (rule, value, callback) {
        value += '';
        if (value.length > 0) {
            if (
                /^(\/\w+)+(\?(\w+=[\w%]*)(&\w+=[\w%]*)*)?(#(\/\w+)+)?$/i.test(value)
            ) {
                callback();
            } else {
                callback(message);
            }
        } else {
            callback();
        }
    }
}