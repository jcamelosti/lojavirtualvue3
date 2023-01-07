import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products){
      state.products = products;
    },
    addToBagMutation(state, product){
      state.productsInBag.push(product);
    },
    removeFromBagMutation(state, productId){
      let updateBag = state.productsInBag.filter(item => item.id != productId);
      state.productsInBag = updateBag;
    }
  },
  actions: {
    loadProducts({ commit }){
      axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        commit('loadProducts', response.data);
      })
    },
    addToBagAction({commit}, product){
      commit('addToBagMutation', product);
    },
    removeFromBagAction({commit}, productId){
      commit('removeFromBagMutation', productId);
    }
  },
  modules: {
  }
})
