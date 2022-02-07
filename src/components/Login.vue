<template>
    <div>
        <h3>Login.vue</h3>
        {{ state }} <hr />
        <input type="text" v-model="state.userid"/>
        <input type="password" v-model="state.userpw"/>
        <input type="button" value="로그인" @click="handleLogin" />
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    // ver 3.0
    setup () { // this를 사용할 수 없음.
        const state = reactive({
            userid : 'aaa',
            userpw : 'bbb'        
        });

        const handleLogin = () =>{
            console.log('로그인 버튼 클릭', state.userid, state.userpw);
        };

        return {state, handleLogin}
    },

    /*
    // state 변수 ver 2.0
    data() {
        return{
            state:{
                userid : 'aaa',
                userpw : 'bbb'
            }

        }
    },

    methods : {
        handleLogin(){
            // 백엔드 연동
        }
 
    }
    */
}
</script>

<style lang="scss" scoped>

</style>