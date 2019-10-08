//校验字段是否为整数
function ngIsInt() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                if ($.type(ctrl.$modelValue) === 'string' && ctrl.$modelValue.length > 0) {
                    var fval = parseFloat(ctrl.$modelValue)
                    var ival = parseInt(ctrl.$modelValue);
                    if (isNaN(ival) || fval>ival) {
                        ctrl.$setValidity('isInt', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { isInt: attrs.ngIsIntMsg === undefined?'该字段必须是整数':attrs.ngIsIntMsg };
                        } else {
                            ctrl.$messages['isInt'] = attrs.ngIsIntMsg === undefined ? '该字段必须是整数' : attrs.ngIsIntMsg;
                        }
                    } else {
                        ctrl.$setValidity('isInt', true);
                    }
                } else {
                    ctrl.$setValidity('isInt', true);
                }
            });
        }
    };
}
module.exports = ngIsInt;