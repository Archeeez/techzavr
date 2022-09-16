import Vue from 'vue';
import Vuex from 'vuex';
// import products from '@/data/products';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // cartProducts: [
    //   { productId: 1, amount: 2 },
    // ],
    cartProducts: [],

    userAccessKey: null,
    cartProductData: [],
    cartLoading: false,
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductData
          .find((p) => p.product.id === item.productId);
        return {
          ...item,
          // product: products.find((p) => p.id === item.productId),
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  mutations: {
    // addProductToCard(state, { productId, amount }) {
    //   const item = state.cartProducts.find((el) => el.productId === productId);

    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    changeCartStateLoading(state, value) {
      state.cartLoading = value;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('changeCartStateLoading', true);
      return setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .then(() => { context.commit('changeCartStateLoading', false); });
      }, 200);
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => { setTimeout(resolve, 500); }))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          }));
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return null;
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      // console.log(productId);
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          console.log('ошибка');
          context.commit('syncCartProducts');
        });
    },
  },
  modules: {
  },
});
