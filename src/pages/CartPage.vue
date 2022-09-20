<template>
<main class="content container" v-if="cartLoadingState">
  <PreloaderAnimation v-if="cartLoadingState"
                          :fullPage="true"
                          :centered="true"
                          :blackout="false" />
</main>
<!-- <main class="content container" v-else-if="!cartData || cartLoadingFailed">
  Не удалось загрузить товар
</main> -->
<main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ getRightWord(products.length, ['товар', 'товара','товаров']) }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products"
                      :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
                       class="cart__button button button--primery" type="submit"
                       :disabled="products.length === 0"
                       >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import getRightWord from '@/helpers/getRightWord';
import PreloaderAnimation from '@/components/PreloaderAnimation.vue';

export default {
  components: { CartItem, PreloaderAnimation },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    cartLoadingState() {
      return this.$store.state.cartLoading;
    },
  },
  methods: {
    getRightWord,
  },
};
</script>
