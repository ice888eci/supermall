export default {
    // 数据复杂使用actions处理然后分发给commit
    changeCart({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            let product = state.cartList.find(item => item.iid.includes(payload.iid));
            if (product) {
                commit('addCounter', product)
                resolve('购物商品加一')
            } else {
                payload.check = true
                commit('addProduct', payload)
                resolve('新增商品')
            }
        })

    }
}