<template>
<div>
        <h3>src/components/Board.vue</h3>

        <h3>게시판목록</h3>
        <!-- <div v-if="state.items">        
            <el-button type="info" @click="handleWrite" style="margin-right:10px;margin-bottom:10px;float:right">글쓰기</el-button>
            <el-button type="info" @click="handleLoadData" style="margin-right:10px;margin-bottom:10px;float:right">검색</el-button>
            <el-input v-model="state.text" @keyup.enter="handleLoadData" placeholder="검색어" 
                style="width:300px;margin-right:10px;margin-bottom:10px;float:right" />

        <el-table :data="state.items" @row-click="rowClick" style="width: 100%">
            <el-table-column prop="_id" label="글번호" width="180" />
            <el-table-column prop="title" label="제목" width="180" />
            <el-table-column prop="writer" label="작성자" />
            <el-table-column prop="hit" label="조회수" />
            <el-table-column prop="regdate" label="작성일자" />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="state.total2" 
            @current-change="currentChange"></el-pagination>
        </div> -->

        <router-link to="/boardwrite">글쓰기</router-link>

       <table border="1">
            <thead>
                <tr>
                <th>no</th>
                <th>title</th>
                <th>writer</th>
                <th>hit</th>
                <th>regdate</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="tmp in state.items.result" :key="tmp">
                 <td @click="handleBoardContent(tmp._id)">{{tmp._id}}</td>
                 <td>{{tmp.title}}</td>
                 <td>{{tmp.writer}}</td>
                 <td>{{tmp.hit}}</td>
                 <td>{{tmp.regdate}}</td>
                </tr>   
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            items : {},
            page : 1,
            text : ''
        
        });
        
        // 생명주기 onMounted(
        onMounted( async() =>{
            const url = `/board/select?page=${state.page}&text=${state.text}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if(response.data.status === 200){
                state.items.result = response.data.rows;
            }
        });

         const handleWrite = () => {
                router.push({name:""})
            }
        
        // function handleBoardContent(no) { }
        const handleBoardContent = (no) => {
            console.log(no)
            // 127.0.0.1:3000/boardcontent?no=2
            router.push({name:"BoardContent", query:{no:no}});
        }

        return {state, handleBoardContent, handleWrite}
    },

}
    /*
    data(){
        return{

        }
    },
    mounted(){

    }
    */



</script>

<style lang="scss" scoped>

</style>