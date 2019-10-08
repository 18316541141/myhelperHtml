//自定义表单最小长度校验，由于内置的校验不够完善，所以只能自定义一个 
function ngMinlength2() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                var len = parseInt(attrs.ngMinlength2);
                if ($.type(ctrl.$modelValue) === 'string') {
                    if (len <= ctrl.$modelValue.length || ctrl.$modelValue.length === 0) {
                        ctrl.$setValidity('minlength2', true);
                    } else {
                        ctrl.$setValidity('minlength2', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { minlength2: attrs.ngMinlength2Msg === undefined ? '该字段长度不能少于' + len + '个字符' : attrs.ngMinlength2Msg };
                        } else {
                            ctrl.$messages['minlength2'] = attrs.ngMinlength2Msg === undefined ? '该字段长度不能少于' + len + '个字符' : attrs.ngMinlength2Msg;
                        }
                    }
                } else {
                    ctrl.$setValidity('minlength2', true);
                }
            });
        }
    };
}
module.exports = ngMinlength2;