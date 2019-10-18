export default {
    validate(value, params) {
        return value === null || value === '' || value.length == parseInt(params[0]);
    }
};