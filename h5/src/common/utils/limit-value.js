var NonNegativeIntLimitValue;
(function () {
    //成员变量保存的对象，使用闭包防止成员变量被随意修改，导致程序出错。
    var __MemberVarMap = {};

    /**
     * 非负数整数限制值，假设池中有a、b、c三个变量，在满足变量和
     * 等于阈值时，三个变量也必须是非负数
     * @param {*} threshold 阈值
     * @param {*} limitValueRule 限制规则，0:全等限制、1:小于等于限制
     * @param {*} keys 变量名称
     */
    NonNegativeIntLimitValue = function (threshold, limitValueRule, keys) {
        if (limitValueRule !== 0 && limitValueRule !== 1) {
            throw new Error("limitValueRule的值必须是0:'全等限制或'、1:'小于等于限制'");
        }
        this.__MemberVarKey = Math.random() + "" + new Date().getTime();
        var _selfVar = __MemberVarMap[this.__MemberVarKey] = {
            threshold: threshold,
            limitValueRule: limitValueRule,
            valuesMap: {}
        };
        var len = keys.length;
        var rest = threshold % len;
        var avg = (threshold - rest) / len;
        for (var i = 0; i < len; i++) {
            _selfVar.valuesMap[keys[i]] = avg;
        }
        _selfVar.valuesMap[keys[0]] += rest;
        console.log(this.outputDebug());
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
        return true;
    }

    /**
     * 更新阈值
     * @param {*} newThreadHold 更新的阈值
     */
    NonNegativeIntLimitValue.prototype.updateThreadHold = function (newThreadHold) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var threshold = _selfVar.threshold;
        var valuesMap = _selfVar.valuesMap;
        var limitValueRule = _selfVar.limitValueRule;
        if (newThreadHold < 0) {
            _selfVar.threshold = 0;
            for (var key in valuesMap) {
                if (valuesMap.hasOwnProperty(key)) {
                    valuesMap[key] = 0;
                }
            }
            return;
        }
        var changeThreadHold = 0;
        if (limitValueRule == 0) {
            changeThreadHold = newThreadHold - threshold;
        } else if (limitValueRule == 1) {
            changeThreadHold = newThreadHold - valSum(valuesMap);
            if (changeThreadHold > 0) {
                _selfVar.threshold = newThreadHold;
                console.log('update threshold='+newThreadHold);
                console.log(this.outputDebug());
                return;
            }
        }
        _selfVar.threshold = newThreadHold;
        var restChangeThreadHold = changeThreadHold % varCount(valuesMap);
        var avgChangeThreadHold = (changeThreadHold - restChangeThreadHold) / varCount(valuesMap);
        var afterVal;
        for (var key in valuesMap) {
            if (valuesMap.hasOwnProperty(key)) {
                afterVal = valuesMap[key] + avgChangeThreadHold;
                if (afterVal >= 0) {
                    valuesMap[key] = afterVal;
                } else {
                    valuesMap[key] = 0;
                    restChangeThreadHold += afterVal;
                }
            }
        }
        if (restChangeThreadHold != 0) {
            for (var key in valuesMap) {
                if (valuesMap.hasOwnProperty(key)) {
                    afterVal = restChangeThreadHold + valuesMap[key];
                    if (afterVal < 0) {
                        valuesMap[key] = 0;
                        restChangeThreadHold = afterVal;
                    } else {
                        valuesMap[key] = afterVal;
                        break;
                    }
                }
            }
        }
        console.log('update threshold='+newThreadHold);
        console.log(this.outputDebug());
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
            console.log('add '+key+'='+val);
            console.log(this.outputDebug());
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
        console.log('add '+key+'='+val);
        console.log(this.outputDebug());
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
        if (limitValueRule === 1 && lossVal < 0) {
            console.log('update '+key+'='+newVal);
            console.log(this.outputDebug());
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
        console.log('update '+key+'='+newVal);
        console.log(this.outputDebug());
    }

    /**
     * 获取变量值
     * @param {*} key 变量名称
     */
    NonNegativeIntLimitValue.prototype.getVal = function(key){
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var valuesMap = _selfVar.valuesMap;
        if (!valuesMap.hasOwnProperty(key)){
            throw new Error("变量不存在，获取失败！");
        }
        return valuesMap[key];
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
module.exports = NonNegativeIntLimitValue;