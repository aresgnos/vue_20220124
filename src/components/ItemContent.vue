<template>
    <div>
        <h3>물품 상세화면</h3>
        <div v-if = "state.items">
            물품명 : {{state.items.name}}
            물품내용 : {{state.items.content}}
            가격 : {{state.items.price}}
            수량 : {{state.items.quantity}}
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

    export default {
        setup (){

            const route = useRoute();

            const state = reactive({
                code : route.query.code
            });

            onMounted( async()=> {
                const url = `/shop/selectone?code=${state.code}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                 if(response.data.status === 200){
                state.items = response.data.result;
                console.log(response.data);
                console.log(state.items)
                }
            });

            return {state}

        }
    }
</script>

<style lang="scss" scoped>

</style>