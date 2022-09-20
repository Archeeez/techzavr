<template>
  <main class="content container">
    <PreloaderAnimation v-if="orderLoading"
                          :fullPage="true"
                          :centered="true"
                          :blackout="true" />
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText :title="'ФИО'"
                          :error="formError.name"
                          :placeholder="'Введите ваше полное имя'"
                          v-model="formData.name" />

            <BaseFormText title="Адрес доставки"
                          :error="formError.address"
                          placeholder="Введите ваш адрес"
                          v-model="formData.address" />

            <BaseFormText title="Телефон"
                          :error="formError.phone"
                          type="tel"
                          placeholder="Введите ваш телефон"
                          v-model="formData.phone" />

            <BaseFormText title="Email"
                          :error="formError.email"
                          type="email"
                          placeholder="Введи ваш Email"
                          v-model="formData.email" />

            <BaseFormTextarea :title="'Комментарий к заказу'"
                              :error="formError.comment"
                              placeholder="Ваши пожелания"
                              v-model="formData.comment"
                              />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="delivery">
                  <input class="options__radio sr-only"
                  type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="delivery">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="pay">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="pay">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>{{item.product.title}}, {{ item.amount }}шт.</h3>
              <b>{{ (item.amount * item.product.price) | numberFormat }} ₽</b>
              <span>Артикул: {{ item.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
              {{ getRightWord(products.length, ['товар', 'товара','товаров']) }}
              на сумму <b>{{totalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit"
                  :disabled="products.length === 0">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import getRightWord from '@/helpers/getRightWord';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import API_BASE_URL from '@/config';
import PreloaderAnimation from '@/components/PreloaderAnimation.vue';

export default {
  components: { BaseFormText, BaseFormTextarea, PreloaderAnimation },
  filters: { numberFormat },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    getRightWord,
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderLoading = true;

      setTimeout(() => {
        axios
          .post(`${API_BASE_URL}/api/orders`, {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
            this.orderLoading = false;
            console.log(response);
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
            this.orderLoading = false;
          });
      }, 200);
    },
  },
};
</script>
