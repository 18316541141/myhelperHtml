export default {
    inserted(el, binding) {
        el.innerText = moment().format(binding.value);
        setInterval(function () {
            el.innerText = moment().format(binding.value);
        }, 1000);
    }
};