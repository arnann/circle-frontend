import {createApp} from 'vue'
// import './style.css'
// @ts-ignore
import App from './App.vue'
import 'vant/lib/index.css';
import {createRouter, createWebHashHistory} from "vue-router"
import routes from "./config/router";
import Vant from 'vant'


const app = createApp(App);
app.use(Vant);

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
app.use(router);

export default router;


app.mount('#app');
