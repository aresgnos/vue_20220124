<template>
    <div>
        <h3>Menu1Insert</h3>

        <button @click="handleAdd">항목추가</button>
        <button @click="handleSub">항목삭제</button>

        <table>
            {{ state.items }}
            <tr v-for="(tmp, idx) in state.cnt" :key="tmp">
                <td><input type="file" @change="handleImage($event, idx)" /></td>
                <td><input type="text" v-model="state.items[idx].name" placeholder="물품명"></td>
                <td><input type="text" v-model="state.items[idx].price" placeholder="가격"></td>
                <td><input type="text" v-model="state.items[idx].quantity" placeholder="수량"></td>
                <td><input type="text" v-model="state.items[idx].content" placeholder="내용"></td>
            </tr>
        </table>
        
        <button @click="handleInsertAction">일괄추가</button>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

export default {
        setup (){
        
        const router = useRouter();

        const state = reactive({
                cnt : 2,
                token : sessionStorage.getItem("TOKEN"),
                items : [

                        {
                            image : '',
                            name : '가죽',
                            price : 1000,
                            quantity : 900,
                            content : '자켓'
                        },
                        {
                            image : '',
                            name : '트위드',
                            price : 848,
                            quantity : 352,
                            content : '자켓'
                        },
                    ]
            });

            const handleAdd = () =>{
                state.cnt++; //1씩 증가
                //state.items의 마지막에 {  }것을 추가 (뒤쪽에 하나씩 붙음)
                state.items.push({
                            image: '',
                            name : '가죽',
                            price : 1000,
                            quantity : 900,
                            content : '자켓'
                });
            }

            const handleSub = () =>{
                if( state.cnt - 1 > 2 ){ //1개를 뺐을 때 2이상이면 = state.cnt >=3 3보다 클 때 뺴라!!
                    state.cnt--; // 실제적으로 숫자를 뺌
                    state.items.pop(); // state.items의 마지막에 {  }것을 제거함. (뒤쪽부터 하나씩 제거)
                }
            }

            // 파일을 첨부하거나 또는 취소하거나 할 때 가능
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

            const handleInsertAction = async() => {
                const url = `/seller/insert`;
                const headers = {
                    "Content-Type":"multipart/form-data",
                    "token"         : state.token
                    };
                const body = new FormData(); // 이미지가 있기 때문
                // state.items => [{},{},{},{}]
                for(let i=0; i<state.items.length;i++){
                    body.append("image", state.items[i].image);
                    body.append("title", state.items[i].name);
                    body.append("price", state.items[i].price);
                    body.append("quantity", state.items[i].quantity);
                    body.append("content", state.items[i].content);
                }
        
                const response = await axios.post(url, body, {headers});
                console.log(response.data);

                if(response.data.status===200) {
                    alert('등록되었습니다.');
                    router.push({name:"Seller"});
                }
            }

            return{state, handleSub, handleAdd, handleInsertAction, handleImage}
        }
    }
</script>

<style lang="scss" scoped>

</style>