export default {
    validate(value) {
        return value === null || value === '' || /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[1-9])[0-9]{8}$/.test(value);
    }
};