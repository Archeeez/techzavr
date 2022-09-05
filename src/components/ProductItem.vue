<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ul class="colors colors--black" v-if="product.colorsId">
      <!-- <li class="colors__item" v-for="color in filterColors">
        <label class="colors__label" for="#73B6EA">
          <input class="colors__radio sr-only"
          type="radio" id="#73B6EA" value="#73B6EA">
          <span class="colors__value" style="background-color: #73B6EA;">
          </span>
        </label>
      </li> -->
      <li class="colors__item" v-for="color in filterColors" :key="color.id">
            <label class="colors__label" :for="`${color.value}-${color.id}`">
              <input class="colors__radio sr-only"
                     type="radio"
                     :id="`${color.value}-${color.id}`"
                     :value="color.id"
                     v-model="choosedColorId">
              <span class="colors__value" :style="`background-color: ${color.value};`">
              </span>
            </label>
          </li>
      <!-- <li class="colors__item">
        <label class="colors__label" for="#8BE000">
          <input class="colors__radio sr-only"
          type="radio" id="#8BE000" value="#8BE000" v-model="color">
          <span class="colors__value" style="background-color: #8BE000;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label" for="#222">
          <input class="colors__radio sr-only"
          type="radio" id="#222" value="#222" v-model="color">
          <span class="colors__value" style="background-color: #222;">
          </span>
        </label>
      </li> -->
    </ul>
</li>
</template>

<script>
import colors from '@/data/colors';

export default {
  props: ['product'],
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
};
</script>
