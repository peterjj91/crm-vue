import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currencyFilter", currencyFilter);
Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: "AIzaSyCtglXtws7P0481VyQMNPeDUDX7UZEBkeI",
  authDomain: "crm-bd835.firebaseapp.com",
  databaseURL: "https://crm-bd835.firebaseio.com",
  projectId: "crm-bd835",
  storageBucket: "crm-bd835.appspot.com",
  messagingSenderId: "719392452144",
  appId: "1:719392452144:web:d6fc6ba65e299f941207f5"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
