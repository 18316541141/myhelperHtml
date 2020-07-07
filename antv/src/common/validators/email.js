/**
 * 校验字段的格式是否为邮箱格式
 * @param {*} message 校验不过输出内容
 */
export default function (message) {
    return function (rule, value, callback) {
        if (value === undefined || value === "" || value === null) {
            callback();
        } else {
            if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                callback();
            } else {
                callback(message);
            }
        }
    };
}