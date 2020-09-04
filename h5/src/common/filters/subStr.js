/**
 * 截取字符串的子串
 * @param {*} value 原始字符串
 * @param {*} startIndex 起始截取位置，若填写非负数，则从左往右开始计算下标，开始截取，从0开始；
 *                    若填写负数，则从右往左开始计算下标，开始截取，从-1开始；
 * @param {*} len 截取长度，可不填；若startIndex非负，则从startIndex往右截取len个字符，若len不填则截取右边的所有字符，
 *              若startIndex为负，则从startIndex往左截取len个字符，若len不填则截取左边的所有字符，
 */
export default function subStr(value, startIndex, len) {
    if (startIndex >= 0) {
        if (len === undefined) {
            return value.substring(startIndex);
        } else {
            return value.substring(startIndex, startIndex + len);
        }
    } else if (startIndex < 0) {
        var endIndex = value.length + startIndex;
        if (len === undefined) {
            return value.substring(0, endIndex + 1);
        } else {
            var startIndex = endIndex - len;
            return value.substring(startIndex, endIndex + 1);
        }
    }
}