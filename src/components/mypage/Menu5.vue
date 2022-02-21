<template>
    <div>
        <h3>주소관리</h3>
        <input type="text" v-model="state.address" placeholder="주소입력" />
        <button @click="handleAddress">등록</button>
        <hr />

        <div v-if="state.items">
        <table border="1">
            <tr>
                <th>선택</th>
                <th>주소</th>
                <th>버튼</th>
            </tr>
            <tr v-for="(item,idx) in state.items" :key="item">
                <td>{{item.chk}}</td>
                <td><input type="text" v-model="item.address" /></td>
                <td>
                    <button @click="handleAddressUpdate(idx)">수정</button>
                    <button @click="handleAddressDelete(item._id)">삭제</button>
                    <button @click="handleChkUpdates(item._id)">대표주소설정</button>
                </td>
            </tr>
        </table>
        </div>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
    export default {
        setup() {
            const state = reactive({
                address : '',
                token : sessionStorage.getItem("TOKEN"),
            })

            onMounted( () => {
                handleLoadData();
            })

            // 주소 목록
            const handleLoadData = async() => {
                const url = `/member/selectaddr`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token,
                }
                const response = await axios.get(url, {headers});
                console.log('Menu5.vue => handleLoadData =>', response.data.result);
                if(response.data.status===200){
                    state.items=response.data.result;
                }               
            }

            // 주소 등록
            const handleAddress = async() => {
                const url = `/member/insertaddr`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token,
                }
                const body = {
                    address : state.address
                }
                const response = await axios.post(url, body, {headers});
                if(response.data.status===200){
                    alert('등록되었습니다.');
                    handleLoadData();
                }               
            }

            // 주소 삭제
            const handleAddressDelete = async(no) => {
                if(confirm('주소를 삭제하시겠습니까?')){
                    const url = `/member/deleteaddr`;
                    const headers = {
                        "Content-Type":"application/json",
                        "token" : state.token,
                    }
                    const body = { no : no };
                    const response = await axios.delete(url,
                        {headers:headers, data:body});
                    if(response.data.status===200){
                        alert('삭제되었습니다.');
                        handleLoadData();
                        }
                    }
                }

            // 대표주소 변경
            const handleChkUpdates = async(no) => {
                if(confirm('대표주소를 변경하시겠습니까?')){
                    const url = `/member/updatechkaddr`;
                    const headers = {
                        "Content-Type":"application/json",
                        "token" : state.token,
                    }
                    const body = {
                        no : no
                    }
                    const response = await axios.put(url, body, {headers:headers});
                    if(response.data.status===200){
                        alert('변경되었습니다.');
                        handleLoadData();
                        }
                    }
                }

                // 주소 수정
                // 몇번째 주소를 수정해야하는지 모르기 때문에 idx
                const handleAddressUpdate = async(idx) => {
                    if(confirm('주소를 수정하시겠습니까?')){
                    const url = `/member/updateaddr`;
                    const headers = {
                        "Content-Type":"application/json",
                        "token" : state.token,
                    }
                    const body = {
                        no : state.items[idx]._id,
                        address : state.items[idx].address
                    }
                    const response = await axios.put(url, body, {headers:headers});

                    if(response.data.status===200){
                        alert('변경되었습니다.');
                        handleLoadData();
                        }
                    }
                }
    
        return {state, handleAddress, handleAddressDelete, handleChkUpdates, handleAddressUpdate}
        }
    }
</script>

<style lang="scss" scoped>

</style>