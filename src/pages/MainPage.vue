<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ getRightWord(countProducts, ['товар', 'товара','товаров']) }}
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :categoryId.sync="filterCategoryId"
                     :price-to.sync="filterPriceTo"
                     :price-from.sync="filterPriceFrom"
                     :colorId.sync="filterColorId" />

      <section class="catalog">
        <ProductList :products="products" />
        <Pagination v-model="page" :per-page="productsPerPage" :count="countProducts" />
      </section>

      <!-- <section class="catalog" v-else>
        <h2>Товаров по выбранному фильтру не нашлось</h2>
      </section> -->
    </div>
  </main>

  </template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import getRightWord from '@/helpers/getRightWord';
import axios from 'axios';

export default {
  components: { ProductList, Pagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,
      productsData: null,
    };
  },
  methods: {
    getRightWord,
    loadProducts() {
      const path = 'https://vue-study.skillbox.cc/api/products';
      axios
        .get(path, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
        .then((response) => {
          this.productsData = response.data;
        });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
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

      if (this.filterColorId) {
        filteredProducts = filteredProducts
          .filter((product) => product.colorsId.includes(this.filterColorId));
      }

      return filteredProducts;
    },

    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      // return this.productsData
      //   ? this.productsData.items.map((product) => ({
      //     ...product,
      //     image: product.image.file.url,
      //   }))
      //   : [];
    },
    countProducts() {
      return this.filteredProducts.length;
      // return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
