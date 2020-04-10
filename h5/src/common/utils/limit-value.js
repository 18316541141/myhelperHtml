var NonNegativeIntLimitValue;
(function () {
    //成员变量保存的对象，使用闭包防止成员变量被随意修改，导致程序出错。
    var __MemberVarMap = {};

    /**
     * 非负数整数限制值，假设池中有a、b、c三个变量，在满足变量和
     * 等于阈值时，三个变量也必须是非负数
     * @param {*} threshold 阈值
     * @param {*} limitValueRule 限制规则，0:全等限制、1:小于等于限制（自动）、2:小于等于限制（手动）
     * @param {*} keys 变量名称
     */
    NonNegativeIntLimitValue = function (threshold, limitValueRule, keys) {
        if (limitValueRule !== 0 && limitValueRule !== 1 && limitValueRule !== 2) {
            throw new Error("limitValueRule的值必须是0:'全等限制或'、1:'小于等于限制（自动）'、2:'小于等于限制（手动）'");
        }
        this.__MemberVarKey = Math.random() + "" + new Date().getTime();
        var _selfVar = __MemberVarMap[this.__MemberVarKey] = {
            threshold: threshold,
            limitValueRule: limitValueRule,
            valuesMap: {}
        };
        var len = keys.length;
        if (limitValueRule === 0) {
            var rest = threshold % len;
            var avg = (threshold - rest) / len;
            for (var i = 0; i < len; i++) {
                _selfVar.valuesMap[keys[i]] = avg;
            }
            _selfVar.valuesMap[keys[0]] += rest;
        } else if (limitValueRule === 1 || limitValueRule === 2) {
            for (var i = 0; i < len; i++) {
                _selfVar.valuesMap[keys[i]] = 0;
            }
        }

        if (NonNegativeIntLimitValue._DebugOutput) {
            console.log(this.outputDebug());
        }
    }

    /**
     * 调试输出的开关
     */
    NonNegativeIntLimitValue._DebugOutput = true;

    /**
     * 关闭调试输出
     */
    NonNegativeIntLimitValue.CloseDebugOutput = function () {
        NonNegativeIntLimitValue._DebugOutput = false;
    }

    /**
     * 获取变量表副本，用于遍历，由于这是副本，对副本的修改不影响原数据的值。
     */
    NonNegativeIntLimitValue.prototype.getDictionary = function () {
        var copyMap = {};
        var valuesMap = __MemberVarMap[this.__MemberVarKey].valuesMap;
        for (var key in valuesMap) {
            if (valuesMap.hasOwnProperty(key)) {
                copyMap[key] = valuesMap[key];
            }
        }
        return copyMap;
    }

    /**
     * 更新阈值
     * @param {*} newThreshold 更新的阈值
     */
    NonNegativeIntLimitValue.prototype.updateThreshold = function (newThreshold) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var threshold = _selfVar.threshold;
        var valuesMap = _selfVar.valuesMap;
        var limitValueRule = _selfVar.limitValueRule;
        if (newThreshold < 0) {
            _selfVar.threshold = 0;
            for (var key in valuesMap) {
                if (valuesMap.hasOwnProperty(key)) {
                    valuesMap[key] = 0;
                }
            }
            return;
        }
        var changeThreshold = 0;
        if (limitValueRule == 0) {
            changeThreshold = newThreshold - threshold;
        } else if (limitValueRule == 1 || limitValueRule == 2) {
            changeThreshold = newThreshold - valSum(valuesMap);
            if (changeThreshold > 0) {
                _selfVar.threshold = newThreshold;
                if (NonNegativeIntLimitValue._DebugOutput) {
                    console.log('update threshold=' + newThreshold);
                    console.log(this.outputDebug());
                }
                return;
            }
        }
        _selfVar.threshold = newThreshold;
        var restChangeThreshold = changeThreshold % varCount(valuesMap);
        var avgChangeThreshold = (changeThreshold - restChangeThreshold) / varCount(valuesMap);
        var afterVal;
        for (var key in valuesMap) {
            if (valuesMap.hasOwnProperty(key)) {
                afterVal = valuesMap[key] + avgChangeThreshold;
                if (afterVal >= 0) {
                    valuesMap[key] = afterVal;
                } else {
                    valuesMap[key] = 0;
                    restChangeThreshold += afterVal;
                }
            }
        }
        if (restChangeThreshold != 0) {
            for (var key in valuesMap) {
                if (valuesMap.hasOwnProperty(key)) {
                    afterVal = restChangeThreshold + valuesMap[key];
                    if (afterVal < 0) {
                        valuesMap[key] = 0;
                        restChangeThreshold = afterVal;
                    } else {
                        valuesMap[key] = afterVal;
                        break;
                    }
                }
            }
        }
        if (NonNegativeIntLimitValue._DebugOutput) {
            console.log('update threshold=' + newThreshold);
            console.log(this.outputDebug());
        }
    }

    /**
     * 追加新变量
     * @param {*} key 变量名称
     * @param {*} newVal 新值
     */
    NonNegativeIntLimitValue.prototype.addVal = function (key, val) {
        if (val === undefined) {
            val = 0;
        }
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var valuesMap = _selfVar.valuesMap;
        var limitValueRule = _selfVar.limitValueRule;
        if (valuesMap.hasOwnProperty(key)) {
            throw new Error("变量已存在，无需再次添加！");
        }
        var threshold = _selfVar.threshold;
        if (val > threshold) {
            val = threshold;
        } else if (val < 0) {
            val = 0;
        }
        valuesMap[key] = val;
        var lossVal = threshold - valSum(valuesMap);
        if (lossVal >= 0) {
            if (NonNegativeIntLimitValue._DebugOutput) {
                console.log('add ' + key + '=' + val);
                console.log(this.outputDebug());
            }
            return;
        }
        if (limitValueRule === 2) {
            valuesMap[key] = 0;
            if (NonNegativeIntLimitValue._DebugOutput) {
                console.log('add ' + key + '=' + val);
                console.log(this.outputDebug());
            }
            return;
        }
        var rest = lossVal % (varCount(valuesMap) - 1);
        var avgLossVal = (lossVal - rest) / (varCount(valuesMap) - 1);
        var afterVal;
        for (var tempKey in valuesMap) {
            if (valuesMap.hasOwnProperty(tempKey) && tempKey != key) {
                afterVal = valuesMap[tempKey] + avgLossVal;
                if (afterVal < 0) {
                    valuesMap[tempKey] = 0;
                    rest += afterVal;
                } else {
                    valuesMap[tempKey] = afterVal;
                }
            }
        }
        if (rest != 0) {
            for (var tempKey in valuesMap) {
                if (valuesMap.hasOwnProperty(tempKey) && tempKey != key && valuesMap[tempKey] > 0) {
                    afterVal = valuesMap[tempKey] + rest;
                    if (afterVal < 0) {
                        valuesMap[tempKey] = 0;
                        rest = afterVal;
                    }
                    else {
                        valuesMap[tempKey] = afterVal;
                        break;
                    }
                }
            }
        }
        if (NonNegativeIntLimitValue._DebugOutput) {
            console.log('add ' + key + '=' + val);
            console.log(this.outputDebug());
        }
    }

    /**
     * 输出调试信息
     */
    NonNegativeIntLimitValue.prototype.outputDebug = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var threshold = _selfVar.threshold;
        var valuesMap = _selfVar.valuesMap;
        var outPut = "Threshold=" + threshold + "，";
        for (var tempKey in valuesMap) {
            if (valuesMap.hasOwnProperty(tempKey)) {
                outPut += tempKey + "=" + valuesMap[tempKey] + "，";
            }
        }
        var connChar = "";
        var sum = 0;
        for (var tempKey in valuesMap) {
            if (valuesMap.hasOwnProperty(tempKey)) {
                outPut += connChar + tempKey;
                connChar = "+";
                sum += valuesMap[tempKey];
            }
        }
        outPut += "=" + sum;
        return outPut;
    }

    /**
     * 获取变量值
     * @param {*} key 变量名称
     */
    NonNegativeIntLimitValue.prototype.getVal = function (key) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var valuesMap = _selfVar.valuesMap;
        if (!valuesMap.hasOwnProperty(key)) {
            throw new Error("变量不存在，获取失败！");
        }
        return valuesMap[key];
    }

    /**
     * 更新变量值
     * @param {*} key 变量名称
     * @param {*} newVal 新值
     */
    NonNegativeIntLimitValue.prototype.updateVal = function (key, newVal) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var threshold = _selfVar.threshold;
        var valuesMap = _selfVar.valuesMap;
        var limitValueRule = _selfVar.limitValueRule;
        if (newVal > threshold) {
            newVal = threshold;
        } else if (newVal < 0) {
            newVal = 0;
        }
        valuesMap[key] = newVal;
        var lossVal = valSum(valuesMap) - threshold;
        if (lossVal <= 0 && limitValueRule == 1) {
            if (NonNegativeIntLimitValue._DebugOutput) {
                console.log('update ' + key + '=' + newVal);
                console.log(this.outputDebug());
            }
            return;
        }
        if (limitValueRule == 2) {
            if (lossVal > 0) {
                valuesMap[key] -= lossVal;
            }
            if (NonNegativeIntLimitValue._DebugOutput) {
                console.log('update ' + key + '=' + newVal);
                console.log(this.outputDebug());
            }
            return;
        }
        var rest = lossVal % (varCount(valuesMap) - 1);
        var lossValAvg = (lossVal - rest) / (varCount(valuesMap) - 1);
        for (var tempKey in valuesMap) {
            if (valuesMap.hasOwnProperty(tempKey) && tempKey != key) {
                if (valuesMap[tempKey] < lossValAvg) {
                    valuesMap[tempKey] = 0;
                    rest += lossValAvg - valuesMap[tempKey];
                } else {
                    valuesMap[tempKey] -= lossValAvg;
                }
            }
        }
        if (rest != 0) {
            for (var tempKey in valuesMap) {
                if (valuesMap.hasOwnProperty(tempKey) && tempKey != key && valuesMap[tempKey] > 0) {
                    if (valuesMap[tempKey] < rest) {
                        valuesMap[tempKey] = 0;
                        rest -= valuesMap[tempKey];
                    } else {
                        valuesMap[tempKey] -= rest;
                        break;
                    }
                }
            }
        }
        if (NonNegativeIntLimitValue._DebugOutput) {
            console.log('update ' + key + '=' + newVal);
            console.log(this.outputDebug());
        }
    }

    /**
     * 对变量表的变量数进行计算
     * @param {*} valuesMap 
     */
    function varCount(valuesMap) {
        var count = 0;
        for (var key in valuesMap) {
            if (valuesMap.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }

    /**
     * 对变量表的变量求和
     * @param {*} valuesMap 
     */
    function valSum(valuesMap) {
        var sum = 0;
        for (var key in valuesMap) {
            if (valuesMap.hasOwnProperty(key)) {
                sum += valuesMap[key];
            }
        }
        return sum;
    }
}());

var NonNegativeDoubleLimitValue;
(function () {

    //成员变量保存的对象，使用闭包防止成员变量被随意修改，导致程序出错。
    var __MemberVarMap = {};

    /**
     * 创建非负浮点数限制
     * @param {*} threshold 阈值，所有变量的和必须小于等于阈值
     * @param {*} decimalCount 小数位数
     * @param {*} limitValueRule 限制规则
     * @param {*} keys 变量的key值
     */
    NonNegativeDoubleLimitValue = function (threshold, decimalCount, limitValueRule, keys) {
        NonNegativeIntLimitValue.CloseDebugOutput();
        this.__MemberVarKey = Math.random() + "" + new Date().getTime();
        __MemberVarMap[this.__MemberVarKey] = {
            threshold: threshold,
            decimalCount: decimalCount,
            nonNegativeIntLimitValue: new NonNegativeIntLimitValue(parseInt(threshold * Math.pow(10, decimalCount + 1) / 10), limitValueRule, keys)
        };
    }

    /**
     * 更新阈值，当阈值相对之前的阈值增加时
     *      在“全等限制”下，所有变量都增加，直到符合全等限制为止、
     *      在“等于或小于限制（自动、手动）”下，所有变量不变
     * 当阈值相对之前的阈值减少时
     *      在“全等限制”下，所有变量都减少，直到符合全等限制为止、
     *      在“等于或小于限制（自动、手动）”下，所有变量和不超过阈值时变量不变；
     *      超过阈值时所有变量都减少，直到符合全等限制为止
     * @param {*} newThreshold 更新的阈值
     */
    NonNegativeDoubleLimitValue.prototype.updateThreshold = function (newThreshold) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var nonNegativeIntLimitValue = _selfVar.nonNegativeIntLimitValue;
        var decimalCount = _selfVar.decimalCount;
        _selfVar.threshold = newThreshold < 0 ? 0 : newThreshold;
        nonNegativeIntLimitValue.updateThreshold(parseInt(newThreshold * Math.pow(10, decimalCount + 1) / 10));
        console.log("update newThreshold=" + newThreshold);
        console.log(this.outputDebug());
    }

    /**
     * 输出调试信息
     */
    NonNegativeDoubleLimitValue.prototype.outputDebug = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var threshold = _selfVar.threshold;
        var outPut = "Threshold=" + threshold + "，";
        var dictionary = this.getDictionary();
        for (var key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                outPut += key + "=" + dictionary[key] + "，";
            }
        }
        var connChar = "";
        var sum = 0;
        for (var key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                outPut += connChar + key;
                connChar = "+";
                sum += dictionary[key];
            }
        }
        outPut += "=" + sum.toFixed(2);
        return outPut;
    }

    /**
     * 获取变量值
     * @param {*} key 变量名
     * @returns 返回变量值
     */
    NonNegativeDoubleLimitValue.prototype.getVal = function (key) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var nonNegativeIntLimitValue = _selfVar.nonNegativeIntLimitValue;
        var decimalCount = _selfVar.decimalCount;
        return nonNegativeIntLimitValue.getVal(key) / Math.pow(10, decimalCount);
    }

    /**
     * 追加新变量
     * @param {*} key 变量名
     * @param {*} val 变量值，可以不传入，默认是0
     */
    NonNegativeDoubleLimitValue.prototype.addVal = function (key, val) {
        if (val === undefined) {
            val = 0;
        }
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var nonNegativeIntLimitValue = _selfVar.nonNegativeIntLimitValue;
        var decimalCount = _selfVar.decimalCount;
        nonNegativeIntLimitValue.addVal(key, parseInt(val * Math.pow(10, decimalCount + 1) / 10));
        console.log("add " + key + "=" + val);
        console.log(this.outputDebug());
    }

    /**
     * 更新值
     * @param {*} key 变量名
     * @param {*} newVal 新值
     */
    NonNegativeDoubleLimitValue.prototype.updateVal = function (key, newVal) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var nonNegativeIntLimitValue = _selfVar.nonNegativeIntLimitValue;
        var decimalCount = _selfVar.decimalCount;
        nonNegativeIntLimitValue.updateVal(key, parseInt(newVal * Math.pow(10, decimalCount + 1) / 10));
        console.log("update " + key + "=" + newVal);
        console.log(this.outputDebug());
    }

    /**
     * 获取只读的map，用于遍历。
     */
    NonNegativeDoubleLimitValue.prototype.getDictionary = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var nonNegativeIntLimitValue = _selfVar.nonNegativeIntLimitValue;
        var decimalCount = _selfVar.decimalCount;
        var tempMap = nonNegativeIntLimitValue.getDictionary();
        for (var key in tempMap) {
            if (tempMap.hasOwnProperty(key)) {
                tempMap[key] /= Math.pow(10, decimalCount);
            }
        }
        return tempMap;
    }
}());
module.exports = NonNegativeIntLimitValue;
module.exports = NonNegativeDoubleLimitValue;