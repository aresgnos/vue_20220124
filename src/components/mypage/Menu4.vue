<template>
    <div>
        <h3>주문목록</h3>
        <hr />
        {{state}}
        <button @click="handleOrderDeleteAction">일괄삭제</button>
        <div v-if="state.items">
        <table border="1">
            <tr>
                <th>체크</th>
                <th>주문번호</th>
                <th>물품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>주문일자</th>
                <th>합계(수량*가격)</th>
            </tr>
            <tr v-for = "item in state.items" :key="item">
                <td><input type="checkbox" :value="item._id" v-model="state.chk"></td>
                <td>{{item._id}}</td>
                <td>{{item.itemname}}</td>
                <td>{{item.itemprice}}</td>
                <td>{{item.ordercnt}}</td>
                <td>{{item.orderdate}}</td>
                <td>{{item.total}}</td>
            </tr>
            <tr>
                <th colspan="6">합계</th>
                <th>{{state.rowtotal}}</th>
            </tr>
        
        </table>
        </div>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

    export default {
        setup () {

            const state = reactive({
                // items : onMounted() 호출 생성
                rowtotal : 0,
                chk : [],
                token : sessionStorage.getItem("TOKEN")
            })
            
            // 주문 취소
            const handleOrderDeleteAction = async() => {
                if(state.chk.length===0){
                    alert('항목을 선택하세요.');
                    return false;
                }
                if(confirm('주문 취소할까요?')){
                const url = `/shop/orderdelete`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                }

                // data: { chk : [1, 3, 4, 2] }
                // req.body.chk => [1, 3, 4, 2]
                const response = await axios.delete(url, {headers:headers, data:{chk:state.chk}});
                console.log(response.data);

                if(response.data.status===200){
                    alert('주문취소 되었습니다.');
                    state.chk = [];
                    handleLoadData();
                    }
                }
            }

            // 주문 목록
            const handleLoadData = async() => {
                const url = `shop/orderlist`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token,
                }

                const response = await axios.get(url, {headers});
                console.log(response.data);

                if(response.data.status === 200){
                    // [ {},{},{} ]
                    state.items = response.data.result;

                    for(let i=0; i<state.items.length; i++){
                        state.items[i]['total'] = Number(state.items[i]['itemprice'])
                                    * Number(state.items[i]['ordercnt']);
                        state.rowtotal += Number(state.items[i]['total']);
                    }
                }
            }

            onMounted( () => {
                handleLoadData();
            })



            return {state, handleLoadData, handleOrderDeleteAction}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>