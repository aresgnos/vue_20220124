<template>
    <div class="style1">
        <h3>회원가입</h3>
        {{ state }}
        {{ userid }}
        <el-form :inline="false" :model="state" class="demo-form-inline" style="width:300px">
            <el-form-item label="아이디">
            <el-input v-model="state.userid"></el-input>
            </el-form-item>
            <el-form-item label="암호">
            <el-input v-model="state.userpw"></el-input>
            </el-form-item>
            <el-form-item label="암호확인">
            <el-input v-model="state.userpw1"></el-input>
            </el-form-item>
            <el-form-item label="이름">
            <el-input v-model="state.username"></el-input>
            </el-form-item>
            
        </el-form>

        <!-- <input type="text" ref="userid" v-model="state.userid">
        <input type="text" ref="userpw" v-model="state.userpw"> -->

        <el-button type="primary" round @click="handleJoin">회원가입</el-button>
        
    </div>
</template>

<script>
import { reactive,ref } from 'vue';
import axois from 'axios';

export default {
    setup () {
        // High레벨, 변수 생성 : 오브젝트만 변화 감지
        const state = reactive({
            userid : 'aaa',
            userpw : '',
            userpw1 : '',
            username : '',
            items :[],
        });

        // Low레벨, 변수만 생성 : 오브젝트가 아니지만 변화 감지 가능
        // 화면에 나오는 곳에서 ref로 연결하면 bbb의 값은 의미가 없어짐 = 내용물이 사라진다.
        const username = ref('null'); 
        const userpw = ref('null');
        const userid = ref('null');
        const userpw1 = ref('nul');

        // function handleJoin() { }, handleJoin 메소드
        const handleJoin = async() => {
            if(state.userid === ''){
                alert('아이디를 입력하세요')
                userid.value.focus();
                return false; // 이 위치에서 메소드 종료
            }
            if(state.userpw === ''){
                alert('암호를 입력하세요')
                userpw.value.focus();
                return false;
            }
            if(state.userpw1 === ''){
                alert('암호를 입력하세요')
                userpw1.value.focus();
                return false;
            }
            if(state.username === ''){
                alert('이름을 입력하세요')
                username.value.focus();
                return false;
            }
            // 유효성 검사 검증 완료되는 시점에 백엔드 연동

            const url = "http://ihongss.com/json/exam13.json";
            const headers = {"Content-Type":"application/json"};
            const response = await axois.get(url, {headers});
            console.log(response.data);

            if(response.data.status === 200) {
                this.items = response.data.data;
            }

        }

        
    
        return {state, username, userpw, userpw1, userid, handleJoin}
    }
    
}
</script>

<!-- scss, less => css -->
<!-- cmd> npm install -D sass-loader@^10 sass -->
<style lang="scss" scoped>
    .style1 {
        border : 1px solid #cccccc;
        padding : 20px;
    }

</style>