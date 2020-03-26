/**
 * 数字转金钱，例如：123 => 123.00
 * @param {*} num 数字
 * @param {*} splitChar 分隔符
 */
export default function numToMoney(num, splitChar) {
    if (splitChar === undefined) {
        splitChar = "";
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