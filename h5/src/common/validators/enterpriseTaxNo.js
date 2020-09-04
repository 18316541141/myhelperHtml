export default {
    validate(value) {
        return value === null || value === '' || value === undefined || /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(value);
    }
};