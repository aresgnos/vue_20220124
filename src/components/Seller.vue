<template>
    <div>
        <h3>판매자 페이지</h3>
        <hr />
        <button @click="handleMenu(1)">물품관리</button>
        <button @click="handleMenu(2)">회원관리</button>
        <button @click="handleMenu(3)">주문관리</button>
        <button @click="handleMenu(4)">물품별주문수량(차트)</button>
        <button @click="handleMenu(5)">시간대별주문수량(차트)</button>
        <hr />
        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        <menu-4 v-if="state.menu === 4"></menu-4>
        <menu-5 v-if="state.menu === 5"></menu-5>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Menu1 from './seller/Menu1.vue';
import Menu2 from './seller/Menu2.vue';
import Menu3 from './seller/Menu3.vue';
import Menu4 from './seller/Menu4.vue';
import Menu5 from './seller/Menu5.vue';

    export default {
        
        components : {
            Menu1, Menu2, Menu3, Menu4, Menu5
        },
        
        setup (){

            const route = useRoute();
            const router = useRouter();

            const state = reactive({
                menu : Number(route.query.menu)
            });

            onMounted( ()=>{
                console.log(route.query.menu);
                if(typeof route.query.menu === 'undefined'){
                    state.menu = 1;
                }
            })

            const handleMenu = (idx) =>{
                router.push({name:"Seller", query:{menu:idx}});
                state.menu = idx;
            }


            return {state, handleMenu}
        }
    }
</script>

<style lang="scss" scoped>

</style>