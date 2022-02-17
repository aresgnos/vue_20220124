<template>
    <div>
        <h3>물품 상세화면</h3>
        {{state}}
        <div v-if = "state.items">
            <img :src="state.items.imageUrl" style="width:300px;" /> <br />
            물품코드 : {{state.items._id}} <br />
            물품명 : {{state.items.name}} <br />
            물품내용 : {{state.items.content}} <br />
            가격 : {{state.items.price}} <br />
            수량 : <select v-model="state.items.ordercnt">
                <option v-for="no in 30" :key="no"> 
                <!-- Number(state.items.quantity) 판매자가 정해놓은 재고수만큼 -->
                {{ no }}
                </option>
            </select> <br />
            <button @click="handleOrderAciton">주문하기</button>
            <button @click="handleCartAciton">장바구니</button>
            <!-- <button @click="handleCartList">장바구니목록</button> -->
            
        </div>
        
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

    export default {
        setup (){

            const route = useRoute();
            const router = useRouter();

            const state = reactive({
                code : route.query.code
            });

            // 주문하기
            const handleOrderAciton = async() => {
            router.push({name:"Order", 
                query : {
                    code: state.items._id, 
                    cnt : state.items.ordercnt
                }
            });
            }

            // 장바구니
            const handleCartAciton = async() => {
                const url = `/shop/insertcart`;
                const headers = {"Content-Type":"application/json"};
                // 물품번호, 수량, 로그인하지 않은 사용자의 정보
                const body = {
                    code : state.items._id,
                    cnt : state.items.ordercnt
                }

                const response = await axios.post(url, body, {headers});
                console.log(response.data);
            }

            // 장바구니 목록
            // const handleCartList = async () => {
            //     const url =`/shop/selectcart`;
            //     const headers = {"Content-Type":"application/json"};
            //     const response = await axios.get(url, {headers});
            //     console.log(response.data);

            // }

            onMounted( async()=> {
                const url = `/shop/selectone?code=${state.code}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                 if(response.data.status === 200){
                    state.items = response.data.result;
                    console.log(state.items)
                }
            })

            return {state, handleOrderAciton, handleCartAciton}

        }
    }
</script>

<style lang="scss" scoped>

</style>