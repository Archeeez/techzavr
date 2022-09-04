<template>
<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      {{countProducts}} товара
    </span>
  </div>

  <div class="content__catalog">

    <ProductFilter :categoryId.sync="filterCategoryId"
                   :price-to.sync="filterPriceTo"
                   :price-from.sync="filterPriceFrom" />

    <section class="catalog">
      <ProductList :products="products" />
      <Pagination v-model="page" :per-page="productsPerPage" :count="countProducts" />
  </section>
  </div>
</main>

</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, Pagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }

      return filteredProducts;
    },

    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
