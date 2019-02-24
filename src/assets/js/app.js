window.Vue = require('vue');


Vue.component('chat-manager', require('./components/Chat/chat-manager-component.vue').default);
Vue.component('chat-login', require('./components/Chat/chat-login-component.vue').default);
Vue.component('user-list',require('./components/Chat/users-list-component.vue').default);
Vue.component('message-box', require('./components/Chat/chat-box-component.vue').default);



const app = new Vue({
    el: "#app"
});