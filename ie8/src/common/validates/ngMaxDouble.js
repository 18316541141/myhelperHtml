//自定义表单最大值（可以是浮点数，可以是整数）校验，由于内置的校验不够完善，所以只能自定义一个
function ngMaxDouble() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                if ($.type(ctrl.$modelValue) === 'string' && ctrl.$modelValue.length > 0) {
                    var val = parseFloat(ctrl.$modelValue);
                    if (isNaN(val)) {
                        ctrl.$setValidity('maxDouble', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { maxDouble: '该字段必须是数字' };
                        } else {
                            ctrl.$messages['maxDouble'] = '该字段必须是数字';
                        }
                    } else {
                        var maxDouble = parseFloat(attrs.ngMaxDouble);
                        if (val > maxDouble) {
                            ctrl.$setValidity('maxDouble', false);
                            if (ctrl.$messages === undefined) {
                                ctrl.$messages = { maxDouble: attrs.ngMaxDoubleMsg === undefined ? '该字段值不能大于' + maxDouble : attrs.ngMaxDoubleMsg };
                            } else {
                                ctrl.$messages['maxDouble'] = attrs.ngMaxDoubleMsg === undefined ? '该字段值不能大于' + maxDouble : attrs.ngMaxDoubleMsg;
                            }
                        } else {
                            ctrl.$setValidity('maxDouble', true);
                        }
                    }
                } else {
                    ctrl.$setValidity('maxDouble', true);
                }
            });
        }
    };
}
module.exports = ngMaxDouble;