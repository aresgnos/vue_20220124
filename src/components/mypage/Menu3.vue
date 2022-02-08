<template>
    <div>
        <h3>Menu3/회원탈퇴</h3>
        <el-form :inline="false" :model="state" class="demo-form-inline" style="width:500px">
            <el-form-item label="현재 비밀번호">
            <el-input v-model="state.pw"></el-input>
            </el-form-item>
        </el-form>
        
        <el-button type="primary" round @click="handleDeleteAction">회원 탈퇴</el-button>

    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

    export default {
        setup () {

            const router = useRouter();
            const store = useStore();

            const state = reactive ({
                pw : '',
                token : sessionStorage.getItem("TOKEN")
            })

            const handleDeleteAction = async() => {
                if(confirm('정말 탈퇴할까요?')) {
                const url = `/member/delete`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                };
                const body = {
                    password : state.pw
                }

                // delete의 구조> delete(url, {headers:헤드, data:전송값})
                const response = await axios.delete(
                    url, {headers:headers, data:body});
                
                console.log(response.data);

                if(response.data.status===200) {
                    sessionStorage.removeItem("TOKEN");
                    alert('회원탈퇴 되었습니다.');
                    // 1. 주소창만 바뀜
                    router.push({name:'Home'});
                    // 2. 메뉴 활성화
                    store.commit("setMenu", "/");
                    // 3. 로그인 상태
                    store.commit("setLogged", false);
                }
            }
        }

            return { state, handleDeleteAction }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>