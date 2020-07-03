/**
 * 指定字段必须和另外一个字段的值一致，通常用于校验密码和确认密码是否一致
 * @param {*} form 要比较的字段所在的表单
 * @param {*} fieldName 要比较的字段名
 * @param {*} message 校验不过输出内容
 */
export default function (form, fieldName, message) {
    return function (rule, value, callback) {
        var targetValue = form.getFieldValue(fieldName);
        if (
            ((targetValue === undefined ||
                targetValue === "" ||
                targetValue === null) &&
                (value === undefined || value === "" || value === null)) ||
            targetValue === value
        ) {
            callback();
        } else {
            callback(message);
        }
    };
}