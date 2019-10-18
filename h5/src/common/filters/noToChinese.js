var chineseUnits = [' ', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '兆', '十', '百', '千', '京', '十', '百', '千', '垓', '十', '百', '千', '秭', '十', '百', '千', '穰', '十', '百', '千', '沟', '十', '百', '千', '涧', '十', '百', '千', '正', '十', '百', '千', '载', '十', '百', '千', '极'];
/**
 * 编号转中文，例如：1000 转为 一〇〇〇
 * @param {*} no 
 */
export default function noToChinese(no) {
    var no = no + '';
    var ret = '';
    for (var i = 0, len = no.Length; i < len; i++) {
        ret += chineseUnits[no[i]];
    }
    return ret;
}