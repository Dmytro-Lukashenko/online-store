import {
  getDatabase,
  ref,
  set,
  get,
  push,
  child,
  update,
} from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as sRef } from "firebase/storage";

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
    myProducts(state, getters) {
      return state.products.filter((product) => {
        return product.ownerId === getters.user.id;
      });
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
    updateProduct(state, { title, description, id }) {
      const product = state.products.find((a) => {
        return a.id === id;
      });
      product.title = title;
      product.description = description;
    },
  },

  actions: {
    async createProduct({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);

      const image = payload.image;

      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.user.id,
          "",
          payload.promo
        );
        //Add new product in RealTime Database
        const db = getDatabase();
        const product = await push(ref(db, "products"), newProduct);
        const imageExt = image.name.slice(image.name.lastIndexOf("."));

        //Add image for new product in Storage
        const storage = getStorage();
        const storageRef = sRef(storage, `products/${product.key}${imageExt}`);
        const fileData = await uploadBytes(storageRef, image);

        //Add URL of image
        const imageSrc = await getDownloadURL(storageRef);

        //Save URL of image in product object
        const dbUpdate = getDatabase();
        const refUpdate = ref(dbUpdate, `products/${product.key}`);
        await update(refUpdate, { imageSrc: imageSrc });

        commit("setLoading", false);
        commit("createProduct", {
          ...newProduct,
          id: product.key,
          imageSrc,
        });
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async fetchProducts({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      const resultProducts = [];
      try {
        const db = ref(getDatabase());
        const productsVal = await get(child(db, `products/`));
        const products = productsVal.val();

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
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async updateProduct({ commit }, { title, description, id }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const dbUpdate = getDatabase();
        const refUpdate = ref(dbUpdate, `products/${id}`);
        await update(refUpdate, { title, description });
        commit("updateProduct", { title, description, id });
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
  },
};
