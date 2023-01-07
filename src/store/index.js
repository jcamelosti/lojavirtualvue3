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
      console.log('adicionado');
      state.productsInBag.push(product);
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
    }
  },
  modules: {
  }
})
