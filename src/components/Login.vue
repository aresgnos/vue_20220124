<template>
    <div class="style1">
        <h3>로그인</h3>
        {{ state }} <br />
        <el-form :inline="false" :model="state" class="demo-form-inline" label-width="120px">
            <el-form-item label="아이디(이메일)">
            <el-input v-model="state.userid" style="width:300px;" ></el-input>
            </el-form-item>
            <el-form-item label="비밀번호">
            <el-input v-model="state.userpw" style="width:300px;" ></el-input>
            </el-form-item>
            <el-form-item label="">
            <el-button type="primary" round @click="handleLogin" style="margin-left:10px;">로그인</el-button>
            </el-form-item>
        </el-form>
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
                console.log('Login.vue=>',response.data);

                // console.log(response.data.token);
                // 저장소에 보관하기 (공통변수)
                sessionStorage.setItem("TOKEN", response.data.token);

                // = store.commit("setToekn", response.data.token);
                alert('로그인되었습니다.');

                // actions를 호출하여 store/state 변수를 변경함
                store.dispatch("handleData", {});

                const curl = sessionStorage.getItem("CURL");
                if(curl === null){
                    // 1. 주소창만 바뀜
                    router.push({name:"Home"});
                    // 2. 메뉴 활성화
                    store.commit("setMenu", "/");
                }
                else { // 이동하고자하는 페이지가 존재하면
                    // string => object로 변경
                    const query = JSON.parse(sessionStorage.getItem("CURL_QUERY"));
                    const params = JSON.parse(sessionStorage.getItem("CURL_PARAMS"));

                    router.push({name:curl, query:query, params:params});
                }

                
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
.style1 {
        border : 1px solid #cccccc;
        padding : 20px;
    }

</style>