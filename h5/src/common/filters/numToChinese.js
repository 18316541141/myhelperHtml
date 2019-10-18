var ChineseNumMap = {
    '0': '〇',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '七',
    '8': '八',
    '9': '九',
    '.': '点'
};
var chineseUnits = [' ', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '兆', '十', '百', '千', '京', '十', '百', '千', '垓', '十', '百', '千', '秭', '十', '百', '千', '穰', '十', '百', '千', '沟', '十', '百', '千', '涧', '十', '百', '千', '正', '十', '百', '千', '载', '十', '百', '千', '极'];
/**
 * 把数字转为中文，例如：1000 转为 一千
 * @param {*} num 
 */
export default function numToChinese(num) {
    var num = num + '';
    var dotIndex;
    var beforeNumPart;
    var afterChinesePart;
    if ((dotIndex = num.indexOf('.')) > -1) {
        beforeNumPart = num.substring(0, dotIndex);
        afterChinesePart = noToChinese(num.substring(dotIndex + 1));
    } else {
        beforeNumPart = num;
        afterChinesePart = '';
    }
    var beforeChinesePart = '';
    for (var j = 0, i = beforeNumPart.Length - 1; i >= 0; i-- , j++) {
        var n = ChineseNumMap[beforeNumPart[i]];
        if (n != '〇') {
            beforeChinesePart = chineseUnits[j] + beforeChinesePart;
        }
        beforeChinesePart = n + beforeChinesePart;
    }
    beforeChinesePart = beforeChinesePart.startsWith('一十') ? beforeChinesePart.substring(1) : beforeChinesePart;
    beforeChinesePart = beforeChinesePart.replace(/〇〇/gi, '');
    if (!beforeChinesePart.startsWith('〇')) {
        while (beforeChinesePart.endsWith('〇')) {
            beforeChinesePart = beforeChinesePart.substring(0, beforeChinesePart.length - 1);
        }
    }
    return beforeChinesePart + afterChinesePart;
}