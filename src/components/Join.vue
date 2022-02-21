<template>
    <div class="style1">
        <h3>회원가입</h3>
        {{ state }}
        <el-form :inline="false" :model="state" class="demo-form-inline" label-width="120px">
            <el-form-item label="아이디(이메일)">
            <el-input v-model="state.userid" style="width:300px;" @keyup="handleEmailCheck" ></el-input>
            {{state.useremailcheck}}<br />
            <!-- <el-button type="primary" round @click="handleEmailCheck" style="margin-left:10px;">중복확인</el-button> -->
            </el-form-item>
            <el-form-item label="암호">
            <el-input v-model="state.userpw" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="암호확인">
            <el-input v-model="state.userpw1" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="이름">
            <el-input v-model="state.username" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="권한">
             <el-select v-model="state.userrole" class="m-2" placeholder="Select" size="large">
                <el-option value="Customer">구매자</el-option>
                <el-option value="Seller">판매자</el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" round @click="handleJoin">회원가입</el-button>
            </el-form-item>
        </el-form>
        
        <!-- 권한 :
        <select v-model="state.userrole">
            <option value="Customer">고객</option>
            <option value="Seller">판매자</option>
        </select><br /> --> 
        
    </div>
</template>

<script>
import { reactive,ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {

        const router = useRouter();

        // High레벨, 변수 생성 : 오브젝트만 변화 감지
        const state = reactive({
            userid : 'aaa',
            userpw : '',
            userpw1 : '',
            username : '',
            useremailcheck : '',
            userrole : '',
        });

        // Low레벨, 변수만 생성 : 오브젝트가 아니지만 변화 감지 가능
        // 화면에 나오는 곳에서 ref로 연결하면 bbb의 값은 의미가 없어짐 = 내용물이 사라진다.
        const username = ref('null'); 
        const userpw = ref('null');
        const userid = ref('null');
        const userpw1 = ref('nul');

        //정확한 이메일 주소인지 확인
        const validEmail = (email) => {
            // 정규표현식 
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(email);
        }

        const handleEmailCheck = async() => {
            // 입력한 내용이 이메일 형식이면 벡엔드로 전송 후 중복유무 확인
            if(validEmail(state.userid)){
                console.log(state.userid);
                const url = `/member/emailcheck?email=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status===200){
                    if(response.data.result === 1){
                        state.useremailcheck='사용불가';
                    }
                    else{
                        state.useremailcheck='사용가능';
                    }
                }
            }
            else{
                state.useremailcheck='중복확인';
            }
        }

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

            if(state.useremailcheck !== '사용가능'){
                alert('이메일 중복체크하세요.');
                userid.value.focus();
                return false;
            }
            // 유효성 검사 검증 완료되는 시점에 백엔드 연동

            const url = `/member/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = { 
                email : state.userid, 
                password: state.userpw, 
                name: state.username,
                role : state.userrole
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert('회원가입되었습니다.');
                router.push({name:'Home'});
            }
        }
    
        return {state, username, userpw, userpw1, userid, handleJoin, handleEmailCheck}
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