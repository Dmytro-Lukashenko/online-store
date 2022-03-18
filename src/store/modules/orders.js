import { getDatabase, ref, get, push, child, update } from "firebase/database";

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
        await push(ref(db, `/users/${ownerId}/orders`), order);
      } catch (error) {
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
        if (orders) {
          Object.keys(orders).forEach((key) => {
            const order = orders[key];

            resultOrders.push(
              new Order(
                order.name,
                order.phone,
                order.productId,
                order.done,
                key
              )
            );
          });
          commit("loadOrders", resultOrders);
        }
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit("clearError");
      try {
        const dbUpdate = getDatabase();
        const refUpdate = ref(
          dbUpdate,
          `/users/${getters.user.id}/orders/${payload}`
        );
        await update(refUpdate, { done: true });
      } catch {
        commit("setError", error.message);
        throw error;
      }
    },
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter((order) => order.done === true);
    },
    unDoneOrders(state) {
      return state.orders.filter((order) => order.done === false);
    },
    orders(state, getters) {
      return getters.unDoneOrders.concat(getters.doneOrders);
    },
  },
};
