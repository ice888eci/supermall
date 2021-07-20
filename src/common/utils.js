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
            timeout = setTimeout(() => fn().apply(this, arg), wait);
        }
    };
}
export { debounce }