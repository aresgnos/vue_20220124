<template>
    <div>
        <h3>Menu2/암호변경</h3>
        <el-form :inline="false" :model="state" class="demo-form-inline" style="width:500px">
            <el-form-item label="현재 비밀번호">
            <el-input v-model="state.pw"></el-input>
            </el-form-item>
            <el-form-item label="변경할 비밀번호">
            <el-input v-model="state.pw1"></el-input>
            </el-form-item>
            <el-form-item label="변경할 비밀번호 확인">
            <el-input v-model="state.pw1"></el-input>
            </el-form-item>
        </el-form>

        <el-button type="primary" round @click="handleUpdateAction">비밀번호변경</el-button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios';

    export default {
        setup () {
            const state = reactive ({
                pw : '',
                pw1 : '',
                pw2 : '',
                token : sessionStorage.getItem("TOKEN")
            });

            const handleUpdateAction = async () => {
                if(state.token !== null) { //토큰이 있는지 확인
                const url = `/member/updatepw`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                    };
                const body = {
                    password : state.pw,
                    password1: state.pw1
                    
                }
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('비밀번호 변경완료');
                }
            }
            
            else{
                // 토큰이 삭제됐을 때
                // URL을 홈으로 변경
                // 메뉴를 /
                // 로그인 상태를 false
            }
        }

            return {state, handleUpdateAction}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>