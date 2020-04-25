/**
 * 对于为null、''、undefined的值赋予一个显示值，否则显示原始值
 * @param {]} value 原始值
 * @param {*} showVal 显示值
 */
export default function emptyValue(value,showVal){
    return (value === null || value === '' || value === undefined)?showVal:value;
}