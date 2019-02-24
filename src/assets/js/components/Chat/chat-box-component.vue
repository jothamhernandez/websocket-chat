<template>
        <div class="input-box row">
            <div class="message-box col-8">
                <div class="row" v-for="message in thread" :key="message.id" >
                    <div class="col-12">
                        <div class="message" v-bind:class="{'me': ws.user == message.sender}">
                            {{message.message}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <textarea name="" id="" cols="30" rows="3" class="form-control" style="resize:none" v-model="chat.message"></textarea>
            </div>
            <div class="col-4">
                <button class="btn btn-primary btn-block" @click="sendMessage">Send</button>
            </div>
        </div>

</template>

<script>
export default {
    props:{
        ws: WebSocket,
        selectedUser: String
    },
    data(){
        return {
            chat: {
                message: '',
               
            },
            thread: []
        }
    },
    mounted(){
        this.$root.$on('message-received', this.renderMessage)
    },
    methods:{
        sendMessage(){
            this.ws.send([this.ws.user, this.chat.message, this.selectedUser]);
            this.thread.push({id: Math.random(), sender: this.ws.user, message:this.chat.message});
            this.chat.message = "";
        },
        renderMessage(message){
            console.log(message);
            if(message[0] == 'message_to_user' && message[3] == this.ws.user){
                this.thread.push({sender: message[1], message: message[2]});
            }
        }
    }
}
</script>

<style>
    .message {
        padding: 5px;
        border-radius: 5px;
        /* display: inline; */
    }

    .me{
        background-color: blue !important;
        color: white;
        float: right !important;
    }
</style>
