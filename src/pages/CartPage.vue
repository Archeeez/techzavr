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

            <!-- <li class="cart__item product">
              <div class="product__pic">
                <img src="img/pic-square-2.jpg" width="120" height="120"
                     srcset="img/pic-square-2@2x.jpg 2x" alt="Название товара">
              </div>
              <h3 class="product__title">
                Гироскутер Razor Hovertrax 2.0
              </h3>
              <p class="product__info product__info--color">
                Цвет:
                <span>
                  <i style="background-color: #73B6EA"></i>
                  Нежно-голубой
                </span>
              </p>
              <span class="product__code">
                Артикул: 1501230
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label for="count">
                  <input type="text" value="1" name="count">
                </label>

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                4 990 ₽
              </b>

              <button class="product__del button-del"
                      type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>

            <li class="cart__item product">
              <div class="product__pic">
                <img src="img/pic-square-3.jpg" width="120" height="120"
                     srcset="img/pic-square-3@2x.jpg 2x" alt="Название товара">
              </div>
              <h3 class="product__title">
                Электрический дрифт-карт Razor Lil’ Crazy
              </h3>
              <p class="product__info product__info--color">
                Цвет:
                <span>
                  <i style="background-color: #FF6B00"></i>
                  Оранжевый
                </span>
              </p>
              <span class="product__code">
                Артикул: 1501230
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label for="count">
                  <input type="text" value="1" name="count">
                </label>

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                8 990 ₽
              </b>

              <button class="product__del button-del" type="button"
                      aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li> -->
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
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
  data() {
    return {
      // productAdded: false,
      // productAddSending: false,
      // productAddSendingFailed: false,
    };
  },
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
