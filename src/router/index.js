import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home/Home";
import Product from "@/components/Products/Product/Product";
import NewProduct from "@/components/Products/NewProduct/NewProduct";
import ProductList from "@/components/Products/ProductList/ProductList";
import Checkout from "@/components/User/Checkout/Checkout";
import Login from "@/components/Auth/Login/Login";
import Registry from "@/components/Auth/Registry/Registry";
import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/product/:id",
      props: true,
      name: "product",
      component: Product,
    },
    {
      path: "/list",
      name: "list",
      component: ProductList,
      beforeEnter: AuthGuard,
    },
    {
      path: "/new",
      name: "new",
      component: NewProduct,
      beforeEnter: AuthGuard,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
      beforeEnter: AuthGuard,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/registry",
      name: "registry",
      component: Registry,
    },
  ],
  mode: "history",
});
