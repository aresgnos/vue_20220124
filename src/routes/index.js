// npm install vue-router@next --save (모듈을 깔았기 때문에)
// 파일명 : src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";

// 라우터 설정하기
import Home from '@/components/Home.vue';
import Board from '@/components/Board.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Mypage from '@/components/Mypage.vue';
import Seller from '@/components/Seller.vue';
import ItemContent from '@/components/ItemContent.vue';
import Menu1Insert from '@/components/seller/Menu1Insert.vue';
import Menu1Detail from '@/components/seller/Menu1Detail.vue';
import Admin from '@/components/Admin.vue';
import Join from '@/components/Join.vue';
import BoardContent from '@/components/BoardContent.vue';
import Chart from '@/components/Chart.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Order from '@/components/Order.vue';
import Quill from '@/components/Quill.vue';





const routes = [
    { path : '/', name : "Home", component:Home },
    { path : '/login', name : "Login", component:Login },
    { path : '/logout', name : "Logout", component:Logout },
    { path : '/mypage', name : "Mypage", component:Mypage },
    { path : '/board', name : "Board", component:Board },
    { path : '/seller', name : "Seller", component:Seller },
    { path : '/itemcontent', name : "ItemContent", component:ItemContent },
    { path : '/menu1insert', name : "Menu1Insert", component:Menu1Insert },
    { path : '/menu1detail', name : "Menu1Detail", component:Menu1Detail },
    { path : '/admin', name : "Admin", component:Admin },
    { path : '/join', name : "Join", component:Join },
    { path : '/boardcontent', name : "BoardContent", component:BoardContent },
    { path : '/chart', name : "Chart", component:Chart },
    { path : '/boardwrite', name : "BoardWrite", component:BoardWrite },
    { path : '/boardupdate', name : "BoardUpdate", component:BoardUpdate },
    { path : '/order', name : "Order", component:Order },
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
    console.log( to, from);
    // 저장소에 보관하기 F12-application-sessingstorage에서 확인 가능
    // sessionStorage.setItem("CURL", to.path);
    // console.log('이동 전 페이지 : ', from);

    const token = sessionStorage.getItem("TOKEN");
    console.log(token);


    // 추가) 토큰이 유효한 상태인지를 주기적으로(그 페이지에 들어갈 때마다) 확인 후에
    // 페이지에 진입하게 해야함.
    // axios를 이용해서 백엔드와 연동

    
    // 로그인이 되어야만 이동할 수 있는 페이지 조건
    // ex) 주문페이지, 회원용 게시판의 글쓰기 ...
    if(to.name === "Order" || to.name === "BoardWrite"){
        if(token === null) {
            // 로그인 성공하고 이동하고자 하는 페이지를 알려주는 역할
            // 로그인 페이지에 CURL을 꺼내서 원하는 페이지 이동(가고자 하는 방향)
            sessionStorage.setItem("CURL", to.name);

            // sessionStorage는 object 자체를 보관할 수 없음.
            // 따라서 object => string으로 변환해서 보관해야함.
            sessionStorage.setItem("CURL_QUERY", JSON.stringify(to.query));
            sessionStorage.setItem("CURL_PARAMS", JSON.stringify(to.params)); // 안 보이게 전송
            return next({name:'Login'}); //로그인페이지로 이동
        }
    }

    //원래 이동하고자 하는 페이지로 이동
    if(to.name !== 'Login'){
        sessionStorage.removeItem("CURL");
        sessionStorage.removeItem("CURL_QUERY");
        sessionStorage.removeItem("CURL_PARAMS");
    }
    next();
    
})

export default router;