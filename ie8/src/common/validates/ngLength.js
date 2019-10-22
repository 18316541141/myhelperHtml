//自定义表单长度校验，由于内置的校验不够完善，所以只能自定义一个
function ngLength() {
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
                var len = parseInt(attrs.ngLength);
                if ($.type(ctrl.$modelValue) === 'string') {
                    if (len === ctrl.$modelValue.length || ctrl.$modelValue.length === 0) {
                        ctrl.$setValidity('length', true);
                    } else {
                        ctrl.$setValidity('length', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { length: attrs.ngLengthMsg === undefined ? '该字段长度必须是' + len + '个字符' : attrs.ngLengthMsg };
                        } else {
                            ctrl.$messages['length'] = attrs.ngLengthMsg === undefined ? '该字段长度必须是' + len + '个字符' : attrs.ngLengthMsg;
                        }
                    }
                } else {
                    ctrl.$setValidity('length', true);
                }
            });
        }
    };
}
module.exports = ngLength;