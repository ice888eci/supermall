/**
 * 防抖节流
 * @param {*} fn 
 * @param {*} wait 
 * @param {*} immediate 
 * @returns 
 */
function debounce(fn, wait = 1000, immediate = true) {
    let timeout = null;
    // 不能使用箭头函数
    return function (...arg) {
        if (immediate) {
            timeout && clearTimeout(timeout);
            let call_now = !timeout;
            timeout = setTimeout(() => (timeout = null), wait);
            call_now && fn.apply(this, arg);
        } else {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, arg), wait);
        }
    };
}
function DateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()
    }
    for (let key in config) {
        /**
         * @padStart
         * 小于两位数的补零
         */
        let newKey = config[key].toString().padStart('2', '0');
        format = format.replace(key, newKey)
    }
    return format;
}
export { debounce, DateFormat }