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
      <el-menu-item v-show="logged === false" index="/login">Login</el-menu-item>
      <el-menu-item v-show="logged === true" index="/logout">Logout</el-menu-item>
      <el-menu-item v-show="logged === true" index="/seller">Seller</el-menu-item>
      <el-menu-item v-show="logged === true" index="/mypage">Mypage</el-menu-item>
      <el-menu-item index="/join">Join</el-menu-item>
      <el-menu-item index="/cart">Cart</el-menu-item>
      <el-menu-item index="/board">Board</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
      
    </el-menu>

    <div v-if="logged === true">{{uid}}, {{uname}}님 로그인</div> 

    {{menu}}, {{logged}}

    <router-view></router-view>


  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup () {

    const store = useStore();

    // store값 가져오기
    // store의 menu 값 실시간으로 확인
    // 마지막으로 방문한 페이지를 session저장소에 보관 후에 반환
    const menu = computed(() =>{
      return store.getters.getMenu
    });

    // store의 logged값 실시간으로 확인
    const logged = computed(() => {
      return store.getters.getLogged
    });

    const uid = computed(() => {
      return store.getters.getUid
    });

    const uname = computed(() => {
      return store.getters.getUname
    });


    // state 변수 생성
    // store에서 읽은 메뉴값으로 초기값 세팅
    const state = reactive({
      activeIndex : menu
    });
    
    onMounted( async () => { //F5 새로고침
        // 저장소에 있는 TOKEN값을 읽어서 존재 유무
        // TOKEN을 추가하는 시점 = 로그인이 완료 됐을 때
        // TOKEN의 값을 제거하는 시점 = 로그아웃 됐을 때
        if(sessionStorage.getItem("TOKEN") === null) {
          // store의 logged 변수값을 false
          store.commit("setLogged", false);
        }
        else{
          // mutations을 호출하는 경우
          store.commit("setLogged", true);

          // actions를 호출하는 경우
          store.dispatch("handleData", {});
        } 
    }); 
    // dispatch = 액션호출

    const handleSelect = (idx) => {
      store.commit("setMenu", idx);
    }

    /*
    // store의 state 변수가 변경되는 시점을 바로 알 수 있다.
    // 변화 감지를 확인해보는 것
    store.subscribe((mutation, state) => {
      console.log('store.subscribe', mutation, state);
    })
    */

    return {menu, logged, handleSelect, state, uname, uid}
  }
}
</script>

<style lang="scss" scoped>

</style>