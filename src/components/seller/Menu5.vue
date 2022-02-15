<template>
    <div>
        <h3>시간대별 주문 수량</h3>
        <div style="width:500px;height:500px">
            <vue3-chart-js
                :id   = "state.id"
                :type = "state.type"
                ref = "chartRef"
                :data = "state.data">
            </vue3-chart-js>  
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import axios from 'axios';

export default {
    components : {
        Vue3ChartJs
    },

    setup () {
    
        const chartRef = ref(null); // 차트를 업데이트 하기 위해 연결

        const state = reactive({
            id   : 'bar',
            type : 'bar',
            data : {
                labels : [], //라벨
                datasets : [
                    { 
                        backgroundColor: [], //색상
                        data: [] //데이터
                    },
                ]
            },
            token :sessionStorage.getItem("TOKEN")
        })

        // 현재 로그인한 판매자를 조건으로 물품별 주문수량 
        const handleLoadData = async () => {
            const url = `/seller/grouphour`;
            const headers = {
                "Content-Type"  : "application/json",
                "token"         : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("seller/Menu5/handleLoadData", response.data);
            if(response.data.status === 200) {
                // [{_id:111, count:2}, {_id:222, count:3}] 이런 형식으로 옴.

                let label = []; // _id가 추가됨
                let background = []; // #000000
                let data = []; // count 추가됨

                for(let tmp of response.data.result){
                    label.push(tmp._id);
                    background.push('#61a0a8','#d48256', '#91c7ae');
                    data.push(tmp.count);
                }

                state.data.labels = label;
                state.data.datasets[0]['backgroundColor'] = background;
                state.data.datasets[0]['data'] = data;

                chartRef.value.update(250);
    
            }
        }

        onMounted( () => {
            handleLoadData();
        })

        return {state, chartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>