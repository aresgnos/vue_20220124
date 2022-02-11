<template>
    <div>
        <h3>Home</h3>

        <vueper-slides
            class="no-shadow"
            :visible-slides="3"
            slide-multiple
            :gap="3"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
            <vueper-slide v-for="tmp in state.slides" 
            :key="tmp" :image="tmp.image" />
            </vueper-slides>
            {{state.items}}

           <!-- <div v-if="state.items">
               <div v-for = "(i, idx1) in state.items.length/4" :key="i">
                   <div v-for="(j, idx2) in 4" :key="j"
                    style = "display:inline-block; width:24%; border:1px solid #cccccc">
                    {{ idx1 }}
                    {{ idx2 }}
                    {{ (idx1 * 4) + idx2 }}
                    {{ state.items.length }}
                    {{ state.items.length/4 }}
                    <img :src="state.items[(idx1*4) + idx2].imageUrl" style="width:100px;"><br />
                    {{ state.items[(idx1*4) + idx2].name }}<br />
                    {{ state.items[(idx1*4) + idx2].price }}<br />

                   </div>
               </div>
           </div> -->

           <div v-if="state.items" style="margin-top:10px;">
            <el-row :gutter="20" v-for="(i, idx1) in state.items.length/4" :key="i">
                <el-col :span="6" :gutter="10" v-for="(j, idx2) in 4" :key="j">
                    <div style="border:1px solid #cccccc;padding:20px;cursor:pointer;"
                    @click="handleDetailPage(state.items[(idx1 * 4) + idx2]._id)">
                    {{ idx1 }} 
                    {{ idx2 }} 
                    {{ (idx1 * 4) + idx2 }}<br />
                    <img :src="state.items[(idx1 * 4) + idx2].imageUrl" 
                        style="width:100%;height:200px;" /><br />
                    {{ state.items[(idx1*4) + idx2].name }}<br />
                    {{ state.items[(idx1*4) + idx2].price }}<br />
                    {{ state.items[(idx1*4) + idx2].content }}<br />
                    </div>
                </el-col>    
            </el-row>    
        </div>


    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import { useRouter } from 'vue-router';

export default {
    components :{
        VueperSlides, VueperSlide
    },

    setup () {

        const router = useRouter();

        const state = reactive({
            slides : [
                { image:require('../assets/4.jpg')},
                { image:require('../assets/3.jpg')},
                { image:require('../assets/6.jpg')},
                ],
            page : 1
        });

        // 메인 화면
        const handleLoadData = async () => {
            const url =`/shop/select?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
                console.log(response.data);
                console.log(state.items)

                // // 15 % 4 => 3 => 1
                // // 14 % 4 => 2 => 2
                // // 13 % 4 => 1 => 3
                // // 12 % 4 => 0 => 0
                // const mod = Math.floor(state.items.length % 4);
                // if(mod !== 0 ){
                //     for(let i=0;i< 4-mod ;i++){
                //         state.items.push({
                //             content: "준비중입니다.",
                //             imageUrl: require('../assets/default.jpg'),
                //             name: "준비중",
                //             price: 0,
                //             quantity: 0,
                //             seller: "",
                //             _id: 0,
                //         });
                //     }
                // }
            }
        }

        const handleDetailPage = (code) => {
            router.push({name:"ItemContent", query:{code:code}});
        }

        onMounted (async()=>{
            await handleLoadData();
        })
        

        return {state, handleDetailPage}
    }
}
</script>

<style lang="scss" scoped>
   

</style>