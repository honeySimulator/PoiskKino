import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'


const app = createApp(App);
app
    .use(router)
    .mount("#app"
    );
