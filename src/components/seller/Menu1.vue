<template>
    <div style="border:1px solid, #cccccc; padding:20px;">
        <h3>물품관리</h3>

        <button @click="handlePage">일괄추가</button>
        <button @click="handleUpdateBatch">일괄수정</button>
        <button @click="handleDeleteBatch">일괄삭제</button>

        {{state.chk}}
        <table border="1">
            <tr>
                <th>체크</th>
                <th>물품코드</th>
                <th>물품명</th>
                <th>이미지</th>
                <th>가격</th>
                <th>수량</th>
                <th>내용</th>
                <th>등록일</th>
                <th>삭제/수정</th>
            </tr>
            <tr v-for="(item, idx) in state.items" :key="item">
                <td><input type="checkbox" :value="item._id" v-model="state.chk" /></td>
                <td><button @click="handleDetailPage(item._id)">{{item._id}}</button></td>
                <td><input type="text" v-model="item.name"></td>
                <td>
                    <img :src="item.imageUrl" style="width:50px; height:50px;">
                    <input type="file" @change="handleImage($event, idx)" />
                </td>
                <td><input type="text" v-model="item.price"></td>
                <td><input type="text" v-model="item.quantity"></td>
                <td><input type="text" v-model="item.content"></td>
                <td>{{item.regdate}}</td>

                <td>
                    <button @click="handleDeleteAction([item._id])">삭제</button>
                    <button @click="handleUpdateAction(idx)">수정</button>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'; // 페이지 이동시킴

    export default {
        setup (){

            const router = useRouter(); // 이동하기

            const state = reactive ({
                token :  sessionStorage.getItem("TOKEN"),
                chk : []
            });

            // 일괄 추가
            const handlePage = () => {
                router.push({name:"Menu1Insert"});
            }

            // 메뉴 상세 조회
            const handleDetailPage = (code) => {
            // components/seller/Menu1Detail.vue 생성하기
            router.push({name:'Menu1Detail', query:{code:code}});
            }

            // 1개 수정
            const handleUpdateAction = async (idx) => {

                const url = `/seller/update`;
                const headers = {
                    "Content-Type":"multipart/form-data",
                    "token"         : state.token
                    };

                // 지금은 불가능한 형태 = { code : 1016, title : 'a' }
                // 지금 가능 = { code : [1016], title : ['a'] }
                const body = new FormData();
                body.append("code", state.items[idx]._id);
                body.append("title", state.items[idx].name);
                body.append("price", state.items[idx].price);
                body.append("quantity", state.items[idx].quantity);
                body.append("content", state.items[idx].content);
                body.append("image", state.items[idx].image); // 배열X, 이미 배열로 옴

                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    await handleLoadData();
                    state.chk = []; // 체크박스 초기화
                }
            }

            // 일괄 수정
            const handleUpdateBatch = async() => {
                // 전체 개수만큼 반복(만약에 1,2,3,4,5,6이면 6)
                let arr = [];
                for(let i=0; i<state.items.length; i++){
                    // 체크한 개수만큼 반복 (만약에 2,3,5이면 3)
                    // 총 6x3=18번 비교해서 일치하는 것을 찾는 것 (검색)
                    for(let j=0; j<state.chk.length;j++){
                        // 전체 내용에서 체크한 번호가 일치하면
                        if(state.items[i]._id===state.chk[j]){
                            console.log(i,j)
                            console.log(state.items[i]._id===state.chk[j]);
                            // 일치하는 것만 array 변수에 저장
                            arr.push( state.items[i] );
                        }
                    }
                }

                // arr는 사용자가 체크한 항목한 복사된 변수
                console.log(arr);

                const url = `/seller/update`;
                const headers = {
                    "Content-Type":"multipart/form-data",
                    "token"         : state.token
                    };

                const body = new FormData();

                for(let i=0; i<arr.length; i++){
                body.append("code", arr[i]._id);
                body.append("title", arr[i].name);
                body.append("price", arr[i].price);
                body.append("quantity", arr[i].quantity);
                body.append("content", arr[i].content);
                body.append("image", arr[i].image); // 배열X, 이미 배열로 옴
                }

                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    await handleLoadData();
                    state.chk = []; // 체크박스 초기화
                }
            }

            // 1개 삭제
            const handleDeleteAction = async(code) => {
                    if(confirm('삭제할까요?')){
                    const url = `/seller/delete`;
                    const headers = {
                        "Content-Type":"application/json",
                        "token" : state.token 
                    };

                    console.log(code);

                    // 원래 하나 보낼 때는 {"code":1016}이지만
                    // 일괄 삭제로 짜놨기 때문에 {"code":[1016]} 형태로
                    const body = {code:code};

                    const response = await axios.delete(url, {headers:headers, data:body});
                    console.log(response.data);
                    if(response.data.status===200){
                        await handleLoadData();
                        state.chk = []; // 체크박스 초기화
                    }
                }
            }
            
            // 일괄 삭제
            const handleDeleteBatch = async() => {
                // state.chk [1,2,3]
                await handleDeleteAction(state.chk);

            }
            
            // 물품 전체 조회
            // 메소드를 만들어서 생명주기에 호출(그래야 다른 곳에서도 쓸 수 있음)
            const handleLoadData = async() =>{
                const url = `/seller/selectlist`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token };
                const response = await axios.get(url, {headers});
                if(response.data.status === 200){
                    state.items = response.data.result;
                }
            }

            const handleImage = ( e, idx ) => {
                console.log(e); // 첨부한 파일의 정보
                console.log(idx); // 위치

                if(e.target.files[0]){ // 첨부했을 경우
                state.items[idx].image = e.target.files[0];
                }
                else { // 첨부하지 않을 경우
                    state.items[idx].image = '';
                }
            }

            // 생명주기, 메소드를 호출
            onMounted( async ()=>{
                await handleLoadData();
            });
                
            return {state, handlePage, handleDeleteAction, handleImage, 
                    handleUpdateAction, handleDeleteBatch, handleUpdateBatch, handleDetailPage}
        }
    }
</script>

<style lang="scss" scoped>

</style>