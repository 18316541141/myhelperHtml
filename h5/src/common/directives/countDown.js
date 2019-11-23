export default {
    inserted(el, binding) {
        el.addEventListener("click", function () {
            var seconds = parseInt(binding.value);
            var beforeText = el.innerText;
            this.setAttribute('disabled', true);
            this.innerText = seconds;
            var interval = setInterval(function () {
                if (seconds > 0) {
                    el.innerText = --seconds;
                }
            }, 1000);
            setTimeout(function () {
                clearInterval(interval);
                el.innerText = beforeText;
                el.setAttribute('disabled', false);
            }, seconds * 1000);
        }, false);
    }
}