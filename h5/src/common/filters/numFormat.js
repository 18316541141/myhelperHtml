/**
 * 数字格式化，若传入(1234,00.0000)，则返回：1234.0000；（格式化字符比数字的小数位数大的时候多出的补到数字后面）
 * 若传入(1234,000000)，则返回：001234（格式化字符比数字的整数位数大的时候多出的补到数字前面）
 * @param {*} num 数字
 * @param {*} format 格式化的格式
 */
export default function numFormat(num, format) {
    if (isNaN(num) || num === null) {
        return null;
    }
    var numStr = num + "";
    var numPointIndex = numStr.indexOf(".");
    var numFloatCount =
        numPointIndex === -1 ? 0 : numStr.length - numPointIndex - 1; //数字字符串小数位数
    var numIntCount = numPointIndex === -1 ? numStr.length : numPointIndex; //数字字符串整数位数
    var formatPointIndex = format.indexOf(".");
    var formatFloatCount =
        formatPointIndex === -1 ? 0 : format.length - formatPointIndex - 1; //格式化字符串小数位数
    var formatIntCount =
        formatPointIndex === -1 ? format.length : formatPointIndex; //格式化字符串整数位数
    var i;
    if (formatFloatCount > numFloatCount) {
        for (i = formatPointIndex + formatFloatCount; i < format.length; i++) {
            numStr += format[i];
        }
    }
    if (formatIntCount > numIntCount) {
        for (i = formatIntCount - numIntCount - 1; i >= 0; i--) {
            numStr = format[i] + numStr;
        }
    }
    return numStr;
}