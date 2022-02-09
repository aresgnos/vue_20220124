<template>
    <div style="border:1px solid, #cccccc; padding:20px;">
        <h3>물품관리</h3>

        <button @click="handlePage">일괄추가</button>
        <button>일괄수정</button>
        <button>일괄삭제</button>

        <table border="1">

            <tr>
                <th>체크</th>
                <th>물품코드</th>
                <th>물품명</th>
                <th>이미지</th>
                <th>가격</th>
                <th>수량</th>
                <th>내용</th>
                <th>등록일</th>
            </tr>
            <tr v-for="item in state.items" :key="item">
                <td><input type="checkbox" /></td>
                <td>{{item._id}}</td>
                <td>{{item.name}}</td>
                <td><img :src="item.imageUrl" style="width:50px; height:50px;"></td>
                <td>{{item.price}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.content}}</td>
                <td>{{item.regdate}}</td>

                <td>
                    <button>삭제</button>
                    <button>수정</button>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'; // 페이지 이동시킴

    export default {
        setup (){

            const router = useRouter(); // 이동하기

            const state = reactive ({
                token : sessionStorage.getItem("TOKEN")
            });

            const handlePage = () => {
                router.push({name:"Menu1Insert"});
            }

            // 생명주기
            onMounted( async ()=>{
                const url = `/seller/selectlist`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token };
                const response = await axios.get(url, {headers});
                if(response.data.status === 200){
                    state.items = response.data.result;
                }
                console.log(response.data);
            });

            return {state, handlePage}
        }
    }
</script>

<style lang="scss" scoped>

</style>