<template>
    <div>
        <h3>My page</h3>

        <button @click="handleMenu(1)">정보수정</button>
        <button @click="handleMenu(2)">암호변경</button>
        <button @click="handleMenu(3)">회원탈퇴</button>
        <button @click="handleMenu(4)">주문목록</button>

        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        <menu-4 v-if="state.menu === 4"></menu-4>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
import Menu4 from './mypage/Menu4.vue';
import { useRoute, useRouter } from 'vue-router';

    export default {
        components:{
            Menu1, Menu2, Menu3, Menu4
        },

        setup () {
            const router = useRouter();
            const route = useRoute();

            const state = reactive({
                menu :  Number(route.query.menu)
            });

            onMounted( ()=>{
                console.log(route.query.menu);
                if(typeof route.query.menu ==='undefined'){
                    state.menu = 1;
                }
            })

            const handleMenu = (idx) =>{
                router.push({name:"Mypage", query:{menu:idx}});
                state.menu = idx;
            }

            return {state, handleMenu}
        }      
    }
</script>

<style lang="scss" scoped>

</style>