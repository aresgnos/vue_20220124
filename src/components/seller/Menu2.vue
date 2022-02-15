<template>
    <div>
        <h3>회원관리</h3>
        <div v-if="state.items">
            <table border="1">
                <tr>
                    <th>주문자</th>
                    <th>이름</th>
                    <th>주문일자</th>
                </tr>
                <tr v-for="item in state.items" :key="item">
                    <td>{{item._id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.regdate}}</td>
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

            const handleLoadData = async() =>{
                const url = `/seller/memberlist`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                };
               const response = await axios.get(url, {headers});

                console.log('seller/Menu2/handleLoadData', response.data);
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