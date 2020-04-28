/**
 * 车牌号码正则校验
 * @param {*} message 校验不过输出内容
 */
export default function(message){
    return function(rule, value, callback){
        if(value === null || value === '' || /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A - Z](([0 - 9]{ 5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(value)){
            callback();
        } else {
            callback(message);
        }
    }
}