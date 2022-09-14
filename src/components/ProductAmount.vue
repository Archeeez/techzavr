<template>
  <div class="product__counter form__counter" v-if="cart">
    <button type="button" aria-label="Убрать один товар">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="count">
      <input type="text" v-model.number="numb" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар" @click="incrementCount">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

  <div class="form__counter" v-else>
    <button type="button" aria-label="Убрать один товар"
            >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="count">
      <span style="display: none;">Количество товаров</span>
      <input type="text" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
            >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

  <!-- <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
            @click="decrementProductAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="count">
      <span style="display: none;">Количество товаров</span>
      <input type="text" v-model.number="productAmount" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
            @click="incrementProductAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div> -->
</template>

<script>
export default {
  props: ['count', 'cart'],
  computed: {
    numb() {
      return this.count;
    },
  },
  methods: {
    incrementCount() {
      this.$emit('count', this.numb += 1);
    },
  },
};
</script>

<style>

</style>
