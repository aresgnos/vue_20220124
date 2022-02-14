<template>
    <div>
        <h3>판매자 페이지</h3>
        <hr />
        <button @click="handleMenu(1)">물품관리</button>
        <button @click="handleMenu(2)">회원관리</button>
        <button @click="handleMenu(3)">주문관리</button>
        <hr />
        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Menu1 from './seller/Menu1.vue';
import Menu2 from './seller/Menu2.vue';
import Menu3 from './seller/Menu3.vue';

    export default {
        
        components : {
            Menu1, Menu2, Menu3
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