<template>
  <router-link :to="{name:'cart'}" class="header__cart" aria-label="Корзина с товарами">
    <PreloaderAnimation v-if="cartLoadingState"
                          :fullPage="false"
                          :centered="true"
                          :blackout="false"
                          :small="true"
                          :top="'-22px'"/>
    <svg width="30" height="21" fill="currentColor" v-else>
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров" v-if="!cartLoadingState">
      {{$store.state.cartProducts.length}}
    </span>
  </router-link>
</template>

<script>
import PreloaderAnimation from './PreloaderAnimation.vue';

export default {
  components: { PreloaderAnimation },
  computed: {
    cartLoadingState() {
      return this.$store.state.cartLoading;
    },
  },
};
</script>
