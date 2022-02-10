<template>
    <div>
        <h3>Menu1Detail</h3>
        {{state}}
        <!-- <div v-if = "state.item">
            코드 : {{state.item._id}}<br />
            물품명 : {{state.item.name}}<br />
            가격 : {{state.item.price}}<br />
            수량 : {{state.item.quantity}}<br />
            내용 : {{state.item.content}}<br />
            등록일 : {{state.item.regdate}}<br />

            <img :src="state.item.imageUrl" />
            <div v-for="tmp in state.item.subImage" :key="tmp">
                <img :src="tmp.imageUrl" style="width100px;height:100px;" />
            </div>
        </div> -->

        <table border="1">
            <tr>
                <th>물품코드</th>
                <th>물품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>내용</th>
                <th>등록일</th>
                <th>이미지</th>
                <th>서브이미지</th>
            </tr>
            <tr v-if = "state.item">
                <td>{{state.item._id}}</td>
                <td>{{state.item.name}}</td>
                <td>{{state.item.price}}</td>
                <td>{{state.item.quantity}}</td>
                <td>{{state.item.content}}</td>
                <td>{{state.item.regdate}}</td>
                <td><img :src="state.item.imageUrl" style="width:200px;height:200px;"></td>
                <td v-for="tmp in state.item.subImage" :key="tmp">
                <img :src="tmp.imageUrl" style="width100px;height:100px;"></td>
            </tr>
            
            
        </table>
            
            <!-- <div v-for="tmp in state.item.subImage" :key="tmp">
                <img :src="tmp.imageUrl" style="width100px;height:100px;" />
            </div> -->

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'; // 페이지 이동시킴
import axios from 'axios';


    export default {
        setup (){

            const route = useRoute(); // 이동하기
            const state = reactive ({
                code : route.query.code,
                token :  sessionStorage.getItem("TOKEN")
            });

            // 바깥에서 쓰지 않으므로 return에 안 넣어도 된다.
            const handleLoadData = async() => {
                const url = `/seller/selectone?code=${state.code}`;
                const headers = { 
                    "Content-Type":"application/json",
                    "token" : state.token }
                
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status===200){
                    state.item = response.data.result;
                }
            }

            // 생명주기 onMounted에서
            // /seller/selectone?code=111을 호출해서 화면에 표시하시오.
            onMounted ( async ()=>{
                await handleLoadData();
            })

            return {state}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>