<template>
    <div>
        <chat-login :ws="ws" v-on:client-connected="connected" class="row"></chat-login>
        <div class="row" v-if="ws">
            <div class="col-12">
                <h1 v-if="ws">{{ws.user}}</h1>
            </div>
            <div class="col-3">
                <user-list :ws="ws" v-on:select-user="chatUser" :clients="clients"></user-list>
            </div>
            <div class="col-9">
                <message-box :ws="ws" :selected-user="selectedUser"></message-box>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    watch:{
        ws: {
            handler: function(newVal, oldVal){
                 newVal.onmessage = (message) => {
                    console.log(message);
                    var chat_data = message.data.split(',');
                
                    if(chat_data[0] == "client_display" && newVal.user != chat_data[1]){
                        if(!this.clients.includes(chat_data[1])){
                            this.clients.push(chat_data[1]);
                        }
                    }

                    if(chat_data[0] == "message_to_user"){
                        this.$root.$emit('message-received', chat_data);
                    }
            };
            }
        }
    },
    data(){
        return {
            ws: null,
            selectedUser: null,
            clients: []
        }
    },
    mounted(){
        if(this.ws){
           
        }
    },
    methods:{
        connected(e){
            this.ws = e;
        },
        chatUser(user){
            this.selectedUser = user;
        }
        
    }
    
}
</script>

<style>

</style>
