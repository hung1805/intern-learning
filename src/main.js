import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/firebase/firebaseConfig.js';

Vue.config.productionTip = false;

// const unsub = onAuthStateChanged(auth, (user) => {
//   console.log(user);
//   store.dispatch('FetchUserData', user.uid);
// });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
