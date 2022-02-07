<template>
    <div>
        <h3>src/components/Admin.vue</h3>
        {{ menu }}
        <button @click="handleMenu(1)">메뉴1</button>
        <button @click="handleMenu(2)">메뉴2</button>
        <button @click="handleMenu(3)">메뉴3</button>
        <button @click="handleCount">1씩증가</button>
        <hr />
        
        <menu-1 v-if="menu.code === 1" 
            title="메뉴111" :count="count.value"
            @handleCount="handleCount"></menu-1>

        <menu-2 v-if="menu.code === 2" 
            title="메뉴222" :count="count.value"
            @handleCount="handleCount"></menu-2>

        <menu-3 v-if="menu.code === 3" 
        title="메뉴333" :count="count.value"
        @handleCount="handleCount"></menu-3>
    </div>
</template>

<script>
import Menu1 from './admin/Menu1.vue';
import Menu2 from './admin/Menu2.vue';
import Menu3 from './admin/Menu3.vue';


import { reactive } from 'vue';
export default {
    components : {
        Menu1, Menu2, Menu3
    },

    setup () {
        // state변수
        // menu.code
        const menu = reactive(
            {code : 1}
        );

        // count.value
        const count = reactive(
            {value : 1}
        );

        // handleMenu 메소드 
        const handleMenu = (idx) => {
            console.log(idx);
            menu.code = idx;
        }

        //count.value값 1씩 증가
        const handleCount = () => {
            count.value++;
        }

        return {menu, count, handleMenu, handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>
