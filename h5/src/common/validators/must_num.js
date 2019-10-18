export default {
    validate(value) {
        return value === null || value === '' || /^\d+$/.test(value);
    }
};