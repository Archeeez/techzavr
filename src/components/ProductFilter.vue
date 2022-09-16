<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="min-price">
          <input class="form__input" type="text"
                 id="min-price" name="min-price"
                 v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>

        <label class="form__label form__label--price" for="max-price">
          <input class="form__input" type="text" id="max-price" name="max-price"
                  v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="category">
          <select class="form__select" type="text" id="category"
                  name="category"
                  v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id"
                    v-for="category in categories"
                    :key="category.id"
                    >{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label" :for="`${color.id}-${color.id}`">
              <input class="colors__radio sr-only"
                     type="radio"
                     :id="`${color.id}-${color.id}`"
                     :value="color.id"
                     v-model="currentColorId">
              <span class="colors__value" :style="`background-color: ${color.code};`">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <!-- <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                     type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset> -->

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="clearForm()">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
// import categories from '@/data/categories';
// import colors from '@/data/colors';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      categoriesData: null,
      colorsData: null,
    };
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
  computed: {
    categories() {
      // return categories;
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    // currentPriceFrom: {
    //   get() {
    //     return this.priceFrom;
    //   },

    //   set(value) {
    //     this.$emit('update:priceFrom', value);
    //   },
    // },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
    },
    clearForm() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
    loadCategories() {
      const path = `${API_BASE_URL}/api/productCategories`;
      axios.get(path)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },
    loadColors() {
      const path = `${API_BASE_URL}/api/colors`;
      axios.get(path)
        .then((response) => {
          console.log(response.data);
          this.colorsData = response.data;
        });
    },
  },
};
</script>
