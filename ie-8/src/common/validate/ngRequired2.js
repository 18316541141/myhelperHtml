//自定义表单必填校验，由于内置的校验不够完善，所以只能自定义一个
export default function ngRequired2() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                if ($.type(ctrl.$modelValue) === 'string') {
                    if (ctrl.$modelValue.length > 0) {
                        ctrl.$setValidity('required', true);
                    } else {
                        ctrl.$setValidity('required', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { required:attrs.ngRequired2Msg===undefined? '该字段不能为空': attrs.ngRequired2Msg};
                        } else {
                            ctrl.$messages['required'] = attrs.ngRequired2Msg === undefined ? '该字段不能为空' : attrs.ngRequired2Msg;
                        }
                    }
                } else {
                    ctrl.$setValidity('required', false);
                    if (ctrl.$messages === undefined) {
                        ctrl.$messages = { required: '该字段不能为空' };
                    } else {
                        ctrl.$messages['required'] = '该字段不能为空';
                    }
                }
            });
        }
    };
}