export default {
    addCounter(state, payload) {
        payload.count += 1;
    },
    addProduct(state, payload) {
        payload.count = 1
        state.cartList.push(payload);
    },

}