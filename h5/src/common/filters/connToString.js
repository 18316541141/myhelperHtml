/**
 * 把集合数据按拼接字符进行拼接
 * @param {*} value 集合数据
 * @param {*} key 要拼接的属性名
 * @param {*} connChar 拼接字符
 */
export default function connListToString(value, key, connChar) {
    if (value === null || value === '' || value === undefined || value.constructor !== Array) {
        return '';
    } else {
        var ret = '';
        var connC = '';
        var tempVal;
        for (var i = 0, len = value.length; i < len; i++) {
            tempVal = value[i];
            if (tempVal === null || tempVal === undefined || tempVal === '') {
                continue;
            } else {
                tempVal = tempVal[key];
                if (tempVal === null || tempVal === undefined || tempVal === '') {
                    continue;
                } else {
                    ret += connC + tempVal;
                    connC = connChar;
                }
            }
        }
        return ret;
    }
}
/**
 * 把数组数据按拼接符进行拼接
 * @param {*} value 
 * @param {*} connChar 
 */
export default function connToString(value, connChar) {
    if (value === null || value === '' || value === undefined || value.constructor !== Array) {
        return '';
    } else {
        var ret = '';
        var connC = '';
        var tempVal;
        for (var i = 0, len = value.length; i < len; i++) {
            tempVal = value[i];
            if (tempVal === null || tempVal === undefined || tempVal === '') {
                continue;
            } else {
                ret += connC + tempVal;
                connC = connChar;
            }
        }
        return ret;
    }
}
/**
 * 按照枚举匹配，对类似aaa,bbb,ccc的数据进行分割，然后按枚举转义，
 * 例如枚举类型是： aaa:'火车',bbb:'面条',ccc:'乙醇'
 * 使用“、”拼接符号对数据进行拼接：火车、面条、乙醇
 * 如果都没有匹配则返回''。
 * @param {*} value 待分割数据的原始值
 * @param {*} splitChar 分隔符
 * @param {*} connChar 拼接符
 * @param {*} envm 枚举，把枚举的key作为转义的输出值，value作为转义的匹配值
 */
export default function splitToStringByEnum(value, splitChar, connChar, envm) {
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
/**
 * 按照枚举匹配，对类似['aaa','bbb','ccc']数组的数据进行按枚举转义，
 * 例如枚举类型是： aaa:'火车',bbb:'面条',ccc:'乙醇'
 * 使用“、”拼接符号对数据进行拼接：火车、面条、乙醇
 * 如果都没有匹配则返回''。
 * @param {*} array 待转义的数组
 * @param {*} connChar 拼接符
 * @param {*} envm 枚举，把枚举的key作为转义的输出值，value作为转义的匹配值
 */
function connToStringByEnum(array, connChar, envm) {
    if (value === null || value === undefined || !Object.prototype.hasOwnProperty.call(array, 'length')) {
        return '';
    } else {
        var connC = '';
        var ret = '';
        for (var i = 0, len = array.length; i < len; i++) {
            for (var key in envm) {
                if (envm[key] + '' === array[i] + '') {
                    ret += connC + key;
                    connC = connChar;
                    break;
                }
            }
        }
        return ret;
    }
}
/**
 * 按照枚举匹配，对7数据进行分割，7转化为二进制是111，然后按枚举转义，
 * 例如：1:'炸弹',2:'混沌',3:'病毒'，在二进制第1位是1时，则匹配：炸弹、
 * 在二进制第2位是1时匹配：混沌、在二进制第3位是1时匹配：病毒...
 * 如果都没有匹配则返回''。
 * @param {*} value 待运算数据的原始值
 * @param {*} connChar 分割后的拼接符号
 * @param {*} envm 枚举，把枚举的key作为转义的输出值，value作为转义的匹配值
 */
function calcToStringByEnum(value, connChar, envm) {
    if (value === null || value === '' || value === undefined || isNaN(value)) {
        return '';
    } else {
        var valueNum = parseInt(value);
        var connC = '';
        var ret = '';
        var index = 0;
        do {
            if (valueNum & 1 === 0) {
                for (var key in envm) {
                    if (envm[key] + '' === index + '') {
                        ret += connC + key;
                        connC = connChar;
                        break;
                    }
                }
            }
            index++;
        } while ((valueNum >>= 1) > 0);
        return ret;
    }
}