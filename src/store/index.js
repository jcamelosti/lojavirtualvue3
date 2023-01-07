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
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));//local storage salva em json
    },
    removeFromBagMutation(state, productId){
      let updateBag = state.productsInBag.filter(item => item.id != productId);
      state.productsInBag = updateBag;
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));//local storage salva em json
    },
    loadBagMutation(state, products){
      state.productsInBag = products;
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
      if(confirm('Deseja realmente remover este produto do carrinho?')){
        commit('removeFromBagMutation', productId);
      }
    },
    loadBagAction({ commit }){
      if(localStorage.getItem('productsInBag')){
        //local storage tem que salvar tudo como objeto javascript
        commit('loadBagMutation', JSON.parse(localStorage.getItem('productsInBag')));
      }
    }
  },
  modules: {
  }
})
