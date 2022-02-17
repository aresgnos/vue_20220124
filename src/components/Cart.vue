<template>
    <div>
        <h3>장바구니</h3>
        <div v-if="state.items">
            <table border="1">
            <tr>
                <th>장바구니번호</th>
                <th>물품명</th>
                <th>구매자</th>
                <th>물품코드</th>
                <th>수량</th>
            </tr>
            <tr v-for="item in state.items" :key="item">
                <td>{{item._id}}</td>
                <td>{{item.itemname}}</td>
                <td>{{item.userid}}</td>
                <td>{{item.code}}</td>
                <td>{{item.cnt}}</td>
            </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios';

    export default {
        setup () {

            const state = reactive ({

            })

            const handleCartList = async () => {
                const url =`/shop/selectcart`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);

                if(response.data.status===200){
                    state.items=response.data.result;
                }
            }

            onMounted ( ()=>{
                handleCartList();
            })

            return {state}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>