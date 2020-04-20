/**
 * 对输入的内容进行限制，必须是整数，取值范围在min-max之间，
 * 使用该方法对值限制的情况下，值必须是必填字段。
 * @param {*} text 输入内容
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 返回值
 */
export default function intRangeLimit(text, min, max) {
    text = text + '';
    var num = parseInt(text);
    if (isNaN(num) || num < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
}

/**
 * 对输入的内容进行限制，必须是浮点，取值范围在min-max之间，
 * 使用该方法对值限制的情况下，值必须是必填字段。
 * @param {*} text 输入内容
 * @param {*} decimalCount 小数位数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 返回一个对象，val：限制后的数值、update：如果为true则修改输入框的值，如果为false则可以不修改。
 */
function doubleRangeLimit(text, decimalCount, min, max) {
    text = text + "";
    var num = parseFloat(text);
    var isUpdate = false;
    if (isNaN(num)) {
      num = min;
    } else {
      if (num < min) {
        num = min;
        isUpdate = true;
      } else if (num > max) {
        num = max;
        isUpdate = true;
      }
    }
    var regex = new RegExp("^\\d{0,}\\.?\\d{0," + decimalCount + "}$");
    return {
      val: num.toFixed(decimalCount),
      update: !regex.test(text) || isUpdate || text === ''
    };
  }