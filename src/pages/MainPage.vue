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

      <section class="catalog" style="position: relative;">
        <PreloaderAnimation v-if="productsLoading"
                            :fullPage="false"
                            :centered="true"
                            :blackout="true" />
        <!-- <section style="position: fixed; top: 50%; left: 50%;" v-if="productsLoading">
          <h2>Грузится</h2>
        </section> -->
        <section v-if="productsLoadingFailed">
          <h2>Произошла ошибка при загрузке товаров
            <button type="button" @click="loadProducts">Попробовать еще раз</button>
          </h2>
        </section>
        <ProductList :products="products" />
        <Pagination v-model="page" :per-page="productsPerPage" :count="countProducts" />
      </section>
    </div>
  </main>

  </template>

<script>
// import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import getRightWord from '@/helpers/getRightWord';
import axios from 'axios';
import API_BASE_URL from '@/config';
import PreloaderAnimation from '@/components/PreloaderAnimation.vue';

export default {
  components: {
    ProductList, Pagination, ProductFilter, PreloaderAnimation,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    getRightWord,
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        const path = `${API_BASE_URL}/api/products`;
        axios
          .get(path, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 200);
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
    filterColorId() {
      this.loadProducts();
    },
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products;

    //   if (this.filterPriceFrom > 0) {
    //     filteredProducts = filteredProducts
    //       .filter((product) => product.price > this.filterPriceFrom);
    //   }

    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts
    //       .filter((product) => product.price < this.filterPriceTo);
    //   }

    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts
    //       .filter((product) => product.categoryId === this.filterCategoryId);
    //   }

    //   if (this.filterColorId) {
    //     filteredProducts = filteredProducts
    //       .filter((product) => product.colorsId.includes(this.filterColorId));
    //   }

    //   return filteredProducts;
    // },

    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
