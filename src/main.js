import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyAFA57d-8P2ndVgSjgQF4e-gxBU0n-4X0k",
      authDomain: "online-store-fe208.firebaseapp.com",
      projectId: "online-store-fe208",
      storageBucket: "online-store-fe208.appspot.com",
      messagingSenderId: "632325294054",
      appId: "1:632325294054:web:8c9acfc5b6d06bdadbf827",
      measurementId: "G-V310F2X0L3",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
}).$mount("#app");
