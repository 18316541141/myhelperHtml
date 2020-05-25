/**
 * 数字转金钱，例如：123 => 123.00，可以使用单个参数：numToMoney(210086) -> 2,100.86、
 * 两个参数：numToMoney(210086,1) -> 210,086.00、三个参数：numToMoney(210086,0,' ') -> 2 100.86
 * @param {*} num 数字
 * @param {*} type 数字类型，0：整数、1：小数（默认是整数type=0）
 *  （有部分系统用1表示一分钱使用“整数”，部分系统是使用0.01表示一分钱使用“小数”）
 * @param {*} splitChar 分隔符，默认使用“,”（splitChar=','）
 */
export default function numToMoney(num, type, splitChar) {
    if (num === null || isNaN(num)) {
        return null;
    }
    if (type === undefined) {
        type = 0;
        if (splitChar === undefined) {
            splitChar = ',';
        }
    } else {
        if (splitChar === undefined) {
            if (isNaN(type)) {
                splitChar = type;
                type = 0;
            } else {
                splitChar = ',';
            }
        }
    }
    if (type === 0) {
        num = parseFloat(num) / 100;
    } else if (type !== 0 && type !== 1) {
        throw new Error('请填写正确的数字类型参数（type参数）。');
    }
    var money = parseFloat(num).toFixed(2);
    var pointIndex = money.indexOf(".");
    var newMoney = money.substring(pointIndex);
    for (; pointIndex > 3; pointIndex -= 3) {
        newMoney =
            splitChar + money.substring(pointIndex - 3, pointIndex) + newMoney;
    }
    return money.substring(0, pointIndex) + newMoney;
}