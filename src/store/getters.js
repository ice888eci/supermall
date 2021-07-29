export default {
    getCartLength(state) {
        return state.cartList.length || 0;
    },
    getCartList(state) {
        return state.cartList;
    },

}