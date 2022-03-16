import { setUserId } from "firebase/analytics";
import * as firebase from "firebase/compat/app";
import { getDatabase, ref, set, get, child, push } from "firebase/database";

class Product {
  constructor(
    title,
    vendor,
    color,
    material,
    price,
    description,
    ownerId,
    imageSrc = "",
    promo = false,
    id = null
  ) {
    (this.title = title),
      (this.vendor = vendor),
      (this.color = color),
      (this.material = material),
      (this.price = price),
      (this.description = description),
      (this.ownerId = ownerId),
      (this.imageSrc = imageSrc),
      (this.promo = promo),
      (this.id = id);
  }
}

export default {
  state: {
    products: [],
  },
  getters: {
    products(state) {
      return state.products;
    },
    promoProducts(state) {
      return state.products.filter((product) => {
        return product.promo;
      });
    },
    myProducts(state) {
      return state.products;
    },
    productById(state) {
      return (productId) => {
        return state.products.find((product) => product.id === productId);
      };
    },
  },
  mutations: {
    createProduct(state, payload) {
      state.products.push(payload);
    },
    loadProducts(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    async createProduct({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      commit("createProduct", payload);
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.user.id,
          payload.imagSrc,
          payload.promo
        );
        const db = getDatabase();
        let random = Math.floor(Math.random() * 1000);
        const product = await set(ref(db, "products/" + random), newProduct);
        commit("setLoading", false);
        // commit("createProduct", {});
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async fetchProducts({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      // console.log(payload);
      const resultProducts = [];
      try {
        const db = ref(getDatabase());
        const productsVal = await get(child(db, `products/`));
        const products = productsVal.val();
        console.log(products);
        Object.keys(products).forEach((key) => {
          const product = products[key];
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownerId,
              product.imageSrc,
              product.promo,
              key
            )
          );
          commit("loadProducts", resultProducts);
          commit("setLoading", false);
        });
        // .then(
        //   (snapshot) => {
        //     if (snapshot.exists()) {
        //       console.log(snapshot.val());
        //     } else {
        //       console.log("No data available");
        //     }
        //   }
        // );
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
  },
};
