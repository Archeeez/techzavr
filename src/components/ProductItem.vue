<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
       @click.prevent="goToPage('product', { id: product.id })">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black" v-if="product.colorsId">
      <li class="colors__item" v-for="color in filterColors" :key="color.id">
            <label class="colors__label" :for="`${color.value}-${color.id}-${product.id}`">
              <input class="colors__radio sr-only"
                     type="radio"
                     :id="`${color.value}-${color.id}-${product.id}`"
                     :value="color.id"
                     v-model="choosedColorId">
              <span class="colors__value" :style="`background-color: ${color.value};`">
              </span>
            </label>
          </li>
    </ul>
</li>
</template>

<script>
import colors from '@/data/colors';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: { numberFormat },
  data() {
    return {
      choosedColorId: 0,
    };
  },
  computed: {
    filterColors() {
      const result = [];
      this.product.colorsId.forEach((id) => {
        result.push(colors.find((color) => color.id === id));
      });
      return result;
    },
  },
  methods: {
    goToPage,
  },
};
</script>
