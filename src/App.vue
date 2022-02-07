<template>
  <div>
    <!-- ElMenu.vue -->
    <!-- Props로 default-active 숫자값을 전달 -->
    <!-- Props로 router ture 값을 전달 -->
    <!-- 자식컴포넌트 emit을 통해서 select 이벤트 -->
    <el-menu
      :default-active="state.activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect">

      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/board">Board</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
      <el-menu-item index="/join">Join</el-menu-item>
      

    </el-menu>

    {{menu}}, {{logged}}

    <router-view></router-view>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import {useStore} from 'vuex';

export default {
  setup () {

    const store = useStore();

    // store값 가져오기
    // 마지막으로 방문한 페이지를 session저장소에 보관 후에 반환
    const menu = computed(() =>{
      return store.getters.getMenu
    });

    // state 변수 생성
    // store에서 읽은 메뉴값으로 초기값 세팅
    const state = reactive({
      activeIndex : menu
    });

    const logged = computed(() => {
      return store.getters.getLogged
    });

    // store값 변경하기
    const handleSelect = (idx) => {
      console.log(idx);
      store.commit("setMenu", idx);

    }
    
    // store의 state 변수가 변경되는 시점을 바로 알 수 있다.
    store.subscribe((mutation, state) => {
      console.log('store.subscribe', mutation, state);
    })

    return {menu, logged, handleSelect, state}
  }
}
</script>

<style lang="scss" scoped>

</style>