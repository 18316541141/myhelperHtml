/**
 * 自定义的字符串长度范围校验规则
 * @param {*} min 范围起始区间
 * @param {*} max 范围结束区间
 * @param {*} message 校验不过输出内容
 */
export default function(min,max,message){
    return function(rule, value, callback){
        if(value === undefined || value === null || value === '' || value.length >= min && value.length <= max){
            callback();
        } else {
            callback(message.replace('{0}',min).replace('{1}',max));
        }
    }
}