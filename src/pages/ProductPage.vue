<template>
  <main class="content container" v-if="productLoading">
    <PreloaderAnimation v-if="productLoading"
                            :fullPage="true"
                            :centered="true"
                            :blackout="false" />
  </main>
  <main class="content container" v-else-if="!productData || productLoadingFailed">
    Не удалось загрузить товар
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{categories.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper" style="width: 570px; height:570px; overflow: hidden;">
          <img width="570" height="570" :src="product.image"
               srcset="img/phone-square@2x.jpg 2x" alt="Название товара"
               style="object-fit: contain; height: 100%; width: 100%;">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/phone-square-1.jpg"
                              srcset="img/phone-square-1@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-2.jpg"
                              srcset="img/phone-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-3.jpg"
                              srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img width="98" height="98" src="img/phone-square-4.jpg"
                              srcset="img/phone-square-4@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <!-- <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio" name="color-item" value="blue" checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li> -->
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label" :for="`${color.id}-${product.id}`">
                    <input class="colors__radio sr-only"
                            type="radio"
                            :id="`${color.id}-${product.id}`"
                            :value="color.id"
                            v-model="choosedColorId">
                    <span class="colors__value" :style="`background-color: ${color.code};`">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <!-- <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only"
                           type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset> -->

            <div class="item__row">

              <ProductAmount :value.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div style="margin-top: 20px;"
                 v-show="productAdded">Товар добавлен в корзину</div>
            <div style="margin-top: 20px;"
                 v-show="productAddSending">Добавляем товар в корзину...</div>
            <div style="margin-top: 20px;"
                 v-show="productAddSendingFailed">
              При добавлении товара возникла ошибка
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать
            свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на
            мобильное устройство можно установить как фирменное приложение, так и различные
            приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
            принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже
            преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что
            не превышает габариты смартфона. Корпус гаджета выполнен из черного
            пластика. На обращенной к пользователю стороне расположен дисплей
            диагональю 56 мм. На дисплей выводятся координаты и скорость,
            а также полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д.
            (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает,
            что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
            погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import products from '@/data/products';
// import categories from '@/data/categories';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import ProductAmount from '@/components/ProductAmount.vue';
import PreloaderAnimation from '@/components/PreloaderAnimation.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapActions } from 'vuex';

export default {
  props: ['pageParams'],
  filters: { numberFormat },
  components: { ProductAmount, PreloaderAnimation },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      choosedColorId: 0,

      productAdded: false,
      productAddSending: false,
      productAddSendingFailed: false,
    };
  },
  computed: {
    product() {
      return this.productData
        ? { ...this.productData, image: this.productData.image.file.url }
        : {};
    },
    categories() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    goToPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.productAddSendingFailed = false;

      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        })
        .catch(() => {
          this.productAdded = false;
          this.productAddSending = false;
          this.productAddSendingFailed = true;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => { this.productData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 200);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
