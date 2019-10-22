//自定义表单最大长度校验，由于内置的校验不够完善，所以只能自定义一个
function ngMaxlength2() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope,el, attrs, ctrl) {
            var validateId = el.attr('data-validate-id');
            if (validateId === undefined) {
                var tempId = new UUID().id;
                ctrl.$validateId = tempId;
                el.attr('data-validate-id', tempId);
            } else {
                ctrl.$validateId = validateId;
            }
            scope.$watch(attrs.ngModel, function () {
                var len = parseInt(attrs.ngMaxlength2);
                if ($.type(ctrl.$modelValue) === 'string') {
                    if (len >= ctrl.$modelValue.length || ctrl.$modelValue.length === 0) {
                        ctrl.$setValidity('maxlength2', true);
                    } else {
                        ctrl.$setValidity('maxlength2', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { maxlength2: attrs.ngMaxlength2Msg === undefined ? '该字段长度不能超过' + len + '个字符' : attrs.ngMaxlength2Msg };
                        } else {
                            ctrl.$messages['maxlength2'] = attrs.ngMaxlength2Msg === undefined ? '该字段长度不能超过' + len + '个字符' : attrs.ngMaxlength2Msg;
                        }
                    }
                } else {
                    ctrl.$setValidity('maxlength2', true);
                }
            });
        }
    };
}
module.exports = ngMaxlength2;