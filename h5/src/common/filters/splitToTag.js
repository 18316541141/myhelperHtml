/**
 * 按照枚举匹配，对类似aaa,bbb,ccc的数据进行分割，然后进行转义，
 * 按枚举转义。例如： aaa:'火车',bbb:'面条',ccc:'乙醇'
 * 然后对数据进行拼接，例如使用“、”拼接符号：火车、面条、乙醇
 * @param {*} value 待分割数据的原始值
 * @param {*} splitChar 分隔符
 * @param {*} connChar 拼接符
 * @param {*} envm 枚举，把枚举的key作为转义的输出值，value作为转义的匹配值
 */
export default function splitToTagByEnum(value, splitChar, connChar, envm) {
    if (value === null || value === '' || value === undefined) {
        return '';
    } else {
        var vals = value.split(splitChar);
        var connC = '';
        var ret = '';
        for (var i = 0, len = vals.length; i < len; i++) {
            for (var key in envm) {
                if (envm[key] + '' === vals[i]) {
                    ret += connC + key;
                    connC = connChar;
                    break;
                }
            }
        }
        return ret;
    }
}