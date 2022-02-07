<template>
    <div>
        <h3>게시물 수정</h3>
        {{state}}

        <div v-if="state.item">
            제목 : <input type="text" v-model="state.item.title" />
            내용 : <textarea rows="6" v-model="state.item.content"></textarea>
            작성자 : <input type="text" v-model="state.item.writer" />
            <input type="button" value="수정" @click="handleUpdateAction" />
        </div>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios'; // 백엔드 연동

    export default {
        setup () {
            const route = useRoute();
            const router = useRouter();

            const state = reactive({
                no : route.query.no,
            });
            
            const handleData = async(no) =>{
                const url = `/board/selectone?no=${no}`;
                const headers = {"Content-Type":"application/json"};

                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    console.log(response.data.result);
                    state.item = response.data.result;
                }
            }

            const handleUpdateAction = async() => {
                const url = `/board/update?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    title : state.item.title,
                    content : state.item.content,
                    writer : state.item.writer
                };
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('수정 되었습니다.');
                    router.push({name:"BoardContent", query:{no : state.no}});
                }


            }

            onMounted( async()=> {
                await handleData(state.no)
            });

            return { state, handleUpdateAction }
        }       
    }
</script>

<style lang="scss" scoped>

</style>