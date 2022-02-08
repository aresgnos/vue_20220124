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
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    // ver 3.0
    setup () { // this를 사용할 수 없음.

        const router = useRouter();
        const store = useStore();

        const state = reactive({
            userid : 'aaa',
            userpw : 'bbb'        
        });

        const handleLogin = async() =>{
            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                email : state.userid,
                password : state.userpw
            };
            const response = await axios.post(url, body, {headers});
            if(response.data.status=== 200){
                console.log(response.data.token);
                // 저장소에 보관하기
                sessionStorage.setItem("TOKEN", response.data.token);
                alert('로그인되었습니다.');

                // 1. 주소창만 바뀜
                router.push({name:"Home"});

                // 2. 메뉴 활성화
                store.commit("setMenu", "/");

                // 3. 로그인 상태
                store.commit("setLogged", true);
            }
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