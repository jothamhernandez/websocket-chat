<template>

    <div class="row">
        <div class="col-12">
            Users Lists
            <div class="users" v-for="client in clients" :key="client" @click="selectUser(client)" v-bind:class="{'selected': selectedUser == client}">{{client}}</div>
        </div>
    </div>

</template>

<script>
export default {
    props:{
        ws: WebSocket,
        clients: Array
    },
    data(){
        return {
            selectedUser: null
        }
    },
    mounted(){
        // this.ws.onmessage = (message) => {
        //     var chat_data = message.data.split(',');
           
        //     if(chat_data[0] == "client_display" && this.ws.user != chat_data[1]){
        //         this.clients.push(chat_data[1]);
        //     }
        // };
    },
    methods: {
        selectUser(client){
            this.selectedUser = client;
            this.$emit('select-user', client);
        }
    }
}
</script>

<style>
    .selected {
        background-color: green;
    }
</style>
