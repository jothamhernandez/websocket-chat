<template>
    <div class="card card-default" v-if="ws == null">
        <div class="card-header">
            Username
        </div>
        <div class="card-body">
            <div class="row form-group">
                <label class="col-3 form-label">Username</label>
                <div class="col-9">
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <button class="btn btn-primary" @click="startChat">Start Chat</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: {
                username: ''
            },
            ws: null,
        }
    },
    methods:{
        startChat(){
            this.ws = this.ws = new WebSocket('ws://127.0.0.1:1337',['WebChat',this.user.username]);
            
            this.ws.onopen =(e)=>{
                if(this.ws){
                    this.ws.user = this.user.username;
                    this.$emit('client-connected', this.ws);
                }   
            }

        }
    }
}
</script>

<style>

</style>
