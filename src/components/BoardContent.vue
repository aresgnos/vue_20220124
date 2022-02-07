<template>
    <div>
        <h3>src/components/BoardContent.vue</h3>
        
        <div v-if="state.item">
            제목 : {{state.item.title}}
            내용 : {{state.item.content}}
            작성자 : {{state.item.writer}}
            이미지 : <img :src="state.item.imageurl" style="width:300px;height:300px;" />
            <hr />
            <hr />
            <router-link to="/board"><button>목록으로</button></router-link>
            <button @click="handleDelete">삭제</button>
            <button @click="handleUpdate">수정</button>
            <button v-if="state.item.prev> 0" @click="handleData(1)">이전글</button>
            <button v-if="state.item.next> 0" @click="handleData(2)">다음글</button>

            <div v-for="tmp in state.reply" :key="tmp">
                댓글 번호 : {{tmp._id}}
                댓글 내용 : {{tmp.content}}
                작성자 : {{tmp.writer}}
                날짜 : {{tmp.regdate}}
                <button @click="handleReplyDelete(tmp._id)">삭제</button>
            </div>
                <textarea rows="6" placeholder="댓글내용" v-model="state.reply1.content"></textarea>
                <input type="text" placeholder="작성자" v-model="state.reply1.writer" />
            <button @click="handleStorage">댓글 저장</button>
            </div>

    </div>
</template>

<script>
import axios from 'axios'; // 백엔드 연동
import { reactive, onMounted } from 'vue'; // state 변수
import { useRoute } from 'vue-router'; // 페이지 이동 후 route.query 
import { useRouter } from 'vue-router'; // 페이지 이동시킴 route.query

export default {
    setup() {
        const route = useRoute(); // 이동 후 받기
        const router = useRouter(); // 이동하기

        // state 변수 생성
        const state = reactive({
            no : route.query.no, //?no=113
            boardno : route.query.no,
            reply1 : {
                content : '',
                writer : '',
            }
        });

        
        // 댓글 삭제
        const handleReplyDelete = async(no) => {
            const url = `/board/deletereply?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.delete(url, {headers:headers, data:{}});
            console.log(response.data);
            if(response.data.status === 200){
                alert('삭제되었습니다.');
                await handleReplyMount(state.no);
            }
        }


        // 수정할 수 있는 화면으로 전환
        const handleUpdate = () => {
            router.push({name:"BoardUpdate", query:{no : state.no}});
        }


        // 삭제하기 메소드 생성
        const handleDelete = async()=> {
            if(confirm('삭제할까요?')) {
                const url = `/board/delete?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.delete(url, 
                                        {headers:headers, data:{}});
                console.log(response.data);
                if(response.data.status === 200){
                router.push({name:"Board", query:{page:1, text:''}});
                }
            }
        }
        
        // 답글 달기
        const handleStorage = async()=> {
            const url = `/board/insertreply?no=${state.boardno}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                content : state.reply1.content,
                writer : state.reply1.writer,
                boardno : state.boardno
            };

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                await handleReplyMount(state.no);
            }
        }
        
        // 게시물 상세화면
        const handleMount = async(no) => {
            const url = `/board/selectone?no=${no}`;
             const headers = {"Content-Type":"application/json"};

            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                console.log(response.data.result);
                state.item = response.data.result;
                }
            }

        // 답글 조회
        const handleReplyMount = async(no) => {
            const url = `/board/selectreply?no=${no}`;
            const headers = {"Content-Type":"application/json"};

            const response = await axios.get(url, {headers});
            console.log(response.data.result);
            if(response.data.status === 200){
                state.reply = response.data.result;
            }
        }

        onMounted( async()=> {
            await handleMount(state.no);
            await handleReplyMount(state.no);

        });

        const handleData = async(idx) =>{
            if(idx === 1) { //이전글
                // 주소창 변경
                // 게시판 상세화면에서 게시판 상세화면으로 전환(같은 화면으로 전환) onMounted()
                // 하는건 동작이 안되기 때문에 아래와 같이 수동으로 (state.no ~)
                // ** 같은 페이지에서 같은 페이지로 전환할 때는 생명주기가 동작하지 않는다!!
                router.push({name:"BoardContent", query:{no:state.item.prev}});
                state.no = state.item.prev;
                await handleMount(state.no);
                await handleReplyMount(state.no);
            }
            else if(idx === 2) { //다음글
                router.push({name:"BoardContent", query:{no:state.item.next}});
                state.no = state.item.next;
                await handleMount(state.no);
                await handleReplyMount(state.no);
            }
        }
        

        
        return {state, handleDelete, handleData, handleReplyMount, 
                handleUpdate, handleStorage, handleReplyDelete}
        }
    }

</script>

<style lang="scss" scoped>

</style>