<template>
<li class="cart__item product">
  <div class="product__pic">
    <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
  </div>
  <h3 class="product__title">
    {{item.product.title}}
  </h3>
  <!-- <p class="product__info">
    Объем: <span>128GB</span>
  </p> -->
  <span class="product__code">
    Артикул: {{item.product.id}}
  </span>

  <ProductAmount class="product__counter" :value.sync="amount"/>

  <b class="product__price">
    {{ (item.amount * item.product.price) | numberFormat }} ₽
  </b>

  <button class="product__del button-del"
          type="button" aria-label="Удалить товар из корзины"
          @click.prevent="deleteProduct(item.productId)">
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductAmount from './ProductAmount.vue';

export default {
  filters: { numberFormat },
  components: { ProductAmount },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    // ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    ...mapActions({ deleteProduct: 'deleteCartProduct' }),
    // deleteProduct(productId) {
    //   this.$store.commit('deleteCartProduct', productId);
    // },
  },
};
</script>
