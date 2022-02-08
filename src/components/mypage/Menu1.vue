<template>
    <div>
        <h3>Menu1/정보수정</h3> 
    </div>
    <!-- 토큰과 변경할 이름 필요 -->
    <el-form :inline="false" :model="state" class="demo-form-inline" style="width:500px">
            <el-form-item label="변경할 이름">
            <el-input v-model="state.name"></el-input>
            </el-form-item>
        </el-form>

        <el-button type="primary" round @click="handleUpdateAction">정보수정</el-button>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

    export default {
        setup () {
            const state = reactive ({
                name : '',
                token : sessionStorage.getItem("TOKEN")
            });
            
            const handleUpdateAction = async () => {
                if(state.token !== null) { //토큰이 있는지 확인
                const url = `/member/update`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                    };
                const body = {
                    name : state.name
                }
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('회원정보 변경완료');
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