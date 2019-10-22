//自定义表单最小值（可以是浮点数，可以是整数）校验，由于内置的校验不够完善，所以只能自定义一个
function ngMinDouble() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            var validateId = el.attr('data-validate-id');
            if (validateId === undefined) {
                var tempId = new UUID().id;
                ctrl.$validateId = tempId;
                el.attr('data-validate-id', tempId);
            } else {
                ctrl.$validateId = validateId;
            }
            scope.$watch(attrs.ngModel, function () {
                if ($.type(ctrl.$modelValue) === 'string' && ctrl.$modelValue.length > 0) {
                    var val = parseFloat(ctrl.$modelValue);
                    if (isNaN(val)) {
                        ctrl.$setValidity('minDouble', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { minDouble: '该字段必须是数字' };
                        } else {
                            ctrl.$messages['minDouble'] = '该字段必须是数字';
                        }
                    } else {
                        var minDouble = parseFloat(attrs.ngMinDouble);
                        if (val < minDouble) {
                            ctrl.$setValidity('minDouble', false);
                            if (ctrl.$messages === undefined) {
                                ctrl.$messages = { minDouble: attrs.ngMinDoubleMsg === undefined ? '该字段值不能小于' + minDouble : attrs.ngMinDoubleMsg };
                            } else {
                                ctrl.$messages['minDouble'] = attrs.ngMinDoubleMsg === undefined ? '该字段值不能小于' + minDouble : attrs.ngMinDoubleMsg;
                            }
                        } else {
                            ctrl.$setValidity('minDouble', true);
                        }
                    }
                } else {
                    ctrl.$setValidity('minDouble', true);
                }
            });
        }
    };
}
module.exports = ngMinDouble;