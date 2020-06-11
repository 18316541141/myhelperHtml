var SplitStrMgr;
(function () {
    //成员变量保存的对象，使用闭包防止成员变量被随意修改，导致程序出错。
    var __MemberVarMap = {};

    /**
     * 含有分隔符的字符串管理器，用于统一管理类似：'aaa、bbb、ccc' 或 'ααα|βββ|γγγ'
     * 之类的字符串。
     * @param {*} connChar 连接字符
     * @param {*} splitStr 初始字符串
     */
    SplitStrMgr = function (connChar, splitStr) {
        this.__MemberVarKey = Math.random() + "" + new Date().getTime();
        var splitStrArray;
        if (connChar === null || connChar === undefined || connChar === '') {
            throw new Error('请使用正确的连接字符');
        }
        if (splitStr === null || splitStr === undefined || splitStr === '' || connChar === splitStr) {
            splitStrArray = [];
        } else {
            splitStrArray = (splitStr + '').split(connChar);
        }
        __MemberVarMap[this.__MemberVarKey] = {
            connChar: connChar + '',
            splitStr: splitStr,
            splitStrArray: splitStrArray
        };
    };

    /**
     * 设置连接字符串
     * @param {*} splitStr 连接字符串
     */
    SplitStrMgr.prototype.setSplitStr = function (splitStr) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var splitStrArray;
        if (splitStr === null || splitStr === undefined || splitStr === '' || _selfVar.connChar === splitStr) {
            splitStrArray = [];
        } else {
            splitStrArray = (splitStr + '').split(_selfVar.connChar);
        }
        _selfVar.splitStr = splitStr;
        _selfVar.splitStrArray = splitStrArray;
    };

    /**
     * 去除重复项
     */
    SplitStrMgr.prototype.removeRepeat = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var splitStrArray = _selfVar.splitStrArray;
        var repeatIndexArray = [];
        for (var i = 0, len_i = splitStrArray.length - 1; i < len_i; i++) {
            for (var j = i + 1, len_j = splitStrArray.length; j < len_j; j++) {
                if (splitStrArray[i] === splitStrArray[j]) {
                    repeatIndexArray[repeatIndexArray.length] = j;
                }
            }
        }
        repeatIndexArray = repeatIndexArray.sort();
        for (i = 0, len_i = repeatIndexArray.length - 1; i < len_i; i++) {
            for (j = repeatIndexArray[i], len_j = repeatIndexArray[i + 1]; j < len_j; j++) {
                splitStrArray[j] = splitStrArray[j + 1];
            }
        }
        splitStrArray.length -= repeatIndexArray.length;
        _selfVar.splitStr = splitStrArray.join(_selfVar.connChar);
    };

    /**
     * 对每一个分割字符去除前后空格操作
     */
    SplitStrMgr.prototype.trim = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var splitStrArray = _selfVar.splitStrArray;
        for (var i = 0, len_i = splitStrArray.length; i < len_i; i++) {
            splitStrArray[i] = splitStrArray[i].replace(/(^\s*)|(\s*$)/g, "");
        }
        _selfVar.splitStr = splitStrArray.join(_selfVar.connChar);
    };

    /**
     * 在结尾追加字符串
     * @param {*} str 追加的字符串
     */
    SplitStrMgr.prototype.add = function (str) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        _selfVar.splitStrArray[_selfVar.splitStrArray.length] = str + '';
        _selfVar.splitStr = _selfVar.splitStrArray.join(_selfVar.connChar);
    };

    /**
     * 在特定位置插入字符串
     * @param {*} index 插入的索引位置
     * @param {*} str 插入的字符串
     */
    SplitStrMgr.prototype.insert = function (index, str) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var splitStrArray = _selfVar.splitStrArray;
        if (index < 0 || parseInt(index) !== index) {
            throw new Error('索引位置参数必须是非负整数。');
        }
        if (index >= splitStrArray.length) {
            throw new Error('当前字符串最大的下标是‘' + (splitStrArray.length - 1) + '’，插入的下标是‘' + index + '’超出最大下标。');
        }
        if (str.indexOf(_selfVar.connChar) > -1) {
            throw new Error('插入的字符串不能含有连接字符串。');
        }
        for (var i = index, len = splitStrArray.length; i < len; i++) {
            splitStrArray[i + 1] = splitStrArray[i];
        }
        splitStrArray[index] = str + '';
        _selfVar.splitStr = splitStrArray.join(_selfVar.connChar);
    };

    /**
     * 在特定位置删除字符串，或根据字符串删除字符串。
     * @param {*} indexOrStr 删除的位置或要删除的字符串
     */
    SplitStrMgr.prototype.del = function (indexOrStr) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        if (indexOrStr === null || indexOrStr === undefined || indexOrStr === '' || indexOrStr === _selfVar.connChar) {
            throw new Error('请填写正确的要删除的位置或要删除的字符串');
        }
        var splitStrArray = _selfVar.splitStrArray;
        var i;
        var len;
        if (isNaN(indexOrStr)) {
            i = splitStrArray.indexOf(indexOrStr);
            if (i === -1) {
                return;
            }
            for (len = splitStrArray.length - 1; i < len; i++) {
                splitStrArray[i] = splitStrArray[i + 1];
            }
        } else {
            if (indexOrStr < 0 || parseInt(indexOrStr) !== indexOrStr) {
                throw new Error('索引位置参数必须是非负整数。');
            }
            if (indexOrStr >= splitStrArray.length) {
                throw new Error('当前字符串最大的下标是‘' + (splitStrArray.length - 1) + '’，插入的下标是‘' + indexOrStr + '’超出最大下标。');
            }
            for (i = indexOrStr, len = splitStrArray.length - 1; i < len; i++) {
                splitStrArray[i] = splitStrArray[i + 1];
            }
        }
        splitStrArray.length--;
        _selfVar.splitStr = splitStrArray.join(_selfVar.connChar);
    }

    /**
     * 获取连接串的字符串数量
     */
    SplitStrMgr.prototype.length = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        return _selfVar.splitStrArray.length;
    };

    /**
     * 获取连接串的数组副本
     */
    SplitStrMgr.prototype.splitStrArray = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        var splitStrArray = _selfVar.splitStrArray;
        var ret = [];
        for (var i = 0, len = splitStrArray.length; i < len; i++) {
            ret[i] = splitStrArray[i];
        }
        return ret;
    };

    /**
     * 检验字符串的索引位置，如果不存在则返回-1
     * @param {*} str 需要检验的字符串
     */
    SplitStrMgr.prototype.indexOf = function (str) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        return _selfVar.splitStrArray.indexOf(str);
    };

    /**
     * 获取连接字符串
     */
    SplitStrMgr.prototype.getSplitStr = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        return _selfVar.splitStr;
    };
}());
export default SplitStrMgr;