import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'
import {
  Search,
  Swipe,
  SwipeItem,
  Field,
  Button,
  Icon,
  Sku,
  Card,
  Tabbar,
  TabbarItem,
  TreeSelect,
  NavBar,
  Sidebar,
  SidebarItem,
  RadioGroup,
  CellGroup,
  Radio,
  Uploader,
  DatetimePicker,
  Popup,
  Area,
  Toast
} from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import tabbar from './components/tabbar'
axios.defaults.baseURL = "http://localhost:82";
axios.defaults.withCredentials=true;
Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.component('tabbar',tabbar);
Vue.use(Search).use(Swipe).use(SwipeItem).use(Field).use(Button)
.use(Icon).use(Sku).use(Card).use(Tabbar).use(TabbarItem).
use(TreeSelect).use(NavBar).use(Sidebar).use(SidebarItem).use(RadioGroup).use(CellGroup)
.use(Radio).use(Uploader).use(DatetimePicker).use(Popup).use(Area).use(Toast);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')