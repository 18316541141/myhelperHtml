/**
 * 对传入的数据和枚举进行匹配，返回枚举的匹配值
 * @param {*} value 传入的值
 * @param {*} envm 枚举类
 */
export default function enumMatchVal(value, envm) {
    if (value === null || value === '' || value === undefined) {
        return '';
    } else {
        for (var key in envm) {
            if (envm[key] + '' === value + '') {
                return key;
            }
        }
        return '';
    }
}