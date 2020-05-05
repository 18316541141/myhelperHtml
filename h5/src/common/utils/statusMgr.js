var StatusMgr;
(function () {
    //成员变量保存的对象，使用闭包防止成员变量被随意修改，导致程序出错。
    var __MemberVarMap = {};

    /**
     * 状态管理器的构造函数，用于记录多个调用方的true、false状态，当
     * 有任意个调用方在该管理器录入true状态时，状态管理器的状态为true；当所有调用
     * 方录入状态为false，状态管理器的状态才为false；刚创建时默认是false。
     */
    StatusMgr = function () {
        this.__MemberVarKey = Math.random() + "" + new Date().getTime();
        __MemberVarMap[this.__MemberVarKey] = {
            currentStatus: false,
            count: 0,
            callback: function () { }
        };
    };
    /**
     * 录入状态
     * @param {*} status 布尔类型状态值
     * @param {*} times 录入次数，默认为1
     */
    StatusMgr.prototype.recordStatus = function (status, times) {
        if (times === undefined) {
            times = 1;
        } else if (isNaN(times) || parseInt(times) < 1 || parseInt(times) > 100) {
            throw new Error("录入失败，times参数只能是1-100的数字");
        }
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        if (status === true) {
            _selfVar.currentStatus = true;
            _selfVar.count += times;
        } else if (status === false) {
            if (_selfVar.count === 0) {
                throw new Error("录入失败，首次录入只能录入'true'");
            }
            if (_selfVar.count < times) {
                throw new Error("录入失败，录入'false'的次数不能超过录入'true'的次数");
            }
            _selfVar.count -= times;
            if (_selfVar.count === 0) {
                _selfVar.currentStatus = false;
                _selfVar.callback();
            }
        } else {
            throw new Error("录入失败，只能录入布尔类型数据：'true'或'false'");
        }
    };
    /**
     * 读取状态
     */
    StatusMgr.prototype.status = function () {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        return _selfVar.currentStatus;
    };

    /**
     * 注册一个事件，当状态有true转为false时调用
     * @param {*} callback 事件的回调函数
     */
    StatusMgr.prototype.falseEvent = function (callback) {
        var _selfVar = __MemberVarMap[this.__MemberVarKey];
        if (typeof (callback) === 'function') {
            _selfVar.callback = callback;
        } else {
            throw new Error("注册失败，必须传入Function类型对象。");
        }
    };
}());
module.exports = StatusMgr;