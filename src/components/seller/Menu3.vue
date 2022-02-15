<template>
    <div>
        <h3>주문관리</h3>

        <div v-if="state.items">
            <table border = "1">
                <tr>
                <th>주문번호</th>
                <th>물품코드</th>
                <th>주문자</th>
                <th>주문수량</th>
                <th>주문일자</th>
                <th>주문단계</th>
                </tr>

                <tr v-for="item in state.items" :key="item">
                    <td>{{item._id}}</td>
                    <td>{{item.itemcode}}</td>
                    <td>{{item.orderid}}</td>
                    <td>{{item.ordercnt}}</td>
                    <td>{{item.orderdate}}</td>
                    <td>{{item.orderstep}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

    export default {
        setup() {

            const state = reactive({
                token : sessionStorage.getItem("TOKEN")
            });

            // 외부에서 사용하지 않으므로 return에 추가하지 않음.
            const handleLoadData = async()=> {
                const url = `/seller/orderlist`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                };
                const response = await axios.get(url, {headers});
                
                // console.log 찍을 때 파일명 찍어주면 정확히 알 수 있다.
                console.log('seller/Menu3/handleLoadData', response.data);
                if(response.data.status===200) {
                    state.items = response.data.result;
                }
            }

            onMounted (() =>{
                handleLoadData();
            })

            return {state}
        }
    }
</script>

<style lang="scss" scoped>

</style>