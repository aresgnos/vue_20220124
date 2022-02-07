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
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {
    components :{
        VueperSlides, VueperSlide
    },

    setup () {
        const state = {
            slides : [
                { image:require('../assets/4.jpg')},
                { image:require('../assets/3.jpg')},
                { image:require('../assets/6.jpg')},
                ]
        }
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>
   

</style>