// npm install vue-router@next --save (모듈을 깔았기 때문에)
// 파일명 : src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";

// 라우터 설정하기
import Home from '@/components/Home.vue';
import Board from '@/components/Board.vue';
import Login from '@/components/Login.vue';
import Admin from '@/components/Admin.vue';
import Join from '@/components/Join.vue';
import BoardContent from '@/components/BoardContent.vue';
import Chart from '@/components/Chart.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Quill from '@/components/Quill.vue';





const routes = [
    { path : '/', name : "Home", component:Home },
    { path : '/login', name : "Login", component:Login },
    { path : '/board', name : "Board", component:Board },
    { path : '/admin', name : "Admin", component:Admin },
    { path : '/join', name : "Join", component:Join },
    { path : '/boardcontent', name : "BoardContent", component:BoardContent },
    { path : '/chart', name : "Chart", component:Chart },
    { path : '/boardwrite', name : "BoardWrite", component:BoardWrite },
    { path : '/boardupdate', name : "BoardUpdate", component:BoardUpdate },
    { path : '/quill', name : "Quill", component:Quill },
    
]

// localhost:8080/#/
// 127.0.0.1:8080/#/
// 127.0.0.1:8080/#/login
// 127.0.0.1:8080/#/board


// 라우터 생성 (주소표기방식, 라우터설정변수)
const router = createRouter({
    history: createWebHashHistory(), // 127.0.0.1:8080/#/login
    routes : routes
})

// 라우터 이동경로 확인 (이동하는 페이지, 이동 전 페이지, 다음페이지로 이동)
router.beforeEach((to, from, next)=>{
     console.log('이동하는 페이지 : ', to.path);
     // 저장소에 보관하기 F12-application-sessingstorage에서 확인 가능
     sessionStorage.setItem("CURL", to.path);
     console.log('이동 전 페이지 : ', from);
     next(); //다음 페이지로 이동
})

export default router;