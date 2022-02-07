<template>
    <div>
        <h3>src/components/Chart.vue</h3>
        <div style="width:500px;height:300px">
            <vue3-chart-js
                :id   = "state.id"
                :type = "state.type"
                ref   = "chartRef"
                :data = "state.data">
            </vue3-chart-js>
            <button @click="updateChart">Update Chart</button>
            <button type="submit" @click="exportChart">Export Chart as PNG</button>  
        </div>

        <div style="max-width:600px; display:block" >
            <vue-3-chart-js v-bind="{ ...barChart }" />
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
    components : {
        Vue3ChartJs
    },
    setup () {
        // object(R) -> reactvie(RW) -> ref(RW Deep)
        const state = { //Read
            id   : 'doughnut',
            type : 'doughnut',
            data : {
                labels : ['html', 'css', 'script', 'vue3'],
                datasets : [
                    { 
                        backgroundColor: ['#41B883','#E46651','#00D8FF','#DD1B16'],
                        data: [340, 220, 460, 320]
                    },
                ]
            }
        }

        const barChart = {
            type : "bar",
            options : {
                min:0, 
                max:100, 
                resposive:true, 
                plugin : {
                    legend : {
                        position : "top",
                    },
                },
            scales: {
                y: {
                    min:-100,
                    max: 100,
                    ticks: {
                        callback:function (value) {
                            return `${value}%`;
                            },
                        },
                    },
                },
            },
            data : {
                labels: ["aa", "bb", "cc", "dd"],
                datasets : [
                    {
                        label : "어쩌고 저쩌고",
                        backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
                        data: [40, 20, 50, 10],
                    },
                    {
                        label: "My Second Dataset",
                        backgroundColor: ["#2ecc71", "#e67e22", "#9b59b6", "#bdc3c7"],
                        data: [-40, -20, -10, -10],
                    },

                ]
            },
        };

        // 빈 것 만들기
        const chartRef = ref(null);

        //function updateChart() { } 
        const updateChart = () => {
            // 변경데이터 설정
            state.data.labels = ['Cats', 'Dogs', 'Hamsters', 'Dragons']
            state.data.datasets = [
                {
                    backgroundColor: ['#333333', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [100, 20, 800, 20]
                }
            ];

            // 컴포넌트에 변화되었음을 알려줌
            chartRef.value.update(250);
        }

        const exportChart = () => {
            let a = document.createElement('a')
            a.href = chartRef.value.chartJSState.chart.toBase64Image()
            a.download = 'image-export.png'
            a.click()
            a = null
        }

        // 리턴함.
        return {state, updateChart, chartRef, exportChart, barChart}
    }
}
</script>

<style lang="scss" scoped>

</style>
