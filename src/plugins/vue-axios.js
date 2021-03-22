import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
const baseURL = 'https://swapi.dev/api';
axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);