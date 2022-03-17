import { getDatabase, ref, get, push, child } from "firebase/database";

class Order {
  constructor(name, phone, productId, done = false, id = null) {
    (this.name = name),
      (this.phone = phone),
      (this.productId = productId),
      (this.done = done),
      (this.id = id);
  }
}

export default {
  state: {
    orders: [],
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async createOrder({ commit }, { name, phone, productId, ownerId }) {
      const order = new Order(name, phone, productId);
      commit("clearError");
      try {
        //Add new order in RealTime Database
        const db = getDatabase();
        console.log(ownerId);
        await push(ref(db, `/users/${ownerId}/orders`), order);
      } catch {
        commit("setError", error.message);
        throw error;
      }
    },
    async fetchOrders({ commit, getters }) {
      commit("setLoading", true);
      commit("clearError");
      const resultOrders = [];
      try {
        const db = ref(getDatabase());
        const ordersVal = await get(
          child(db, `/users/${getters.user.id}/orders`)
        );
        const orders = ordersVal.val();
        console.log(orders);
        Object.keys(orders).forEach((key) => {
          const order = orders[key];
          resultOrders.push(
            new Order(order.name, order.phone, order.productId, order.done, key)
          );
        });
        commit("loadOrders", resultOrders);
      } catch {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
  },
  getters: {
    doneOrders(state) {
      state.orders.filter((order) => order.done);
    },
    unDoneOrders(state) {
      state.orders.filter((order) => !order.done);
    },
    orders(state, getters) {
      return getters.unDoneOrders.concat(getters.doneOrders);
    },
  },
};
