<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrementNubmer">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label for="count">
      <input type="text" v-model.number="amount" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар" @click="incrementNubmer">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

  <!-- <div class="form__counter" v-else>
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
  </div> -->
</template>

<script>
export default {
  props: ['value'],
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
  methods: {
    incrementNubmer() {
      this.amount += 1;
    },
    decrementNubmer() {
      if (this.amount > 1) this.amount -= 1;
    },
  },
};
</script>

<style>

</style>
