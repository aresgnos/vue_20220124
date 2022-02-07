<template>
    <div>
        <h3>Quill</h3>
        <QuillEditor theme="snow" toolbar="full" 
        v-model:content="state.content" style="height:500px"/>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from 'vue';

   export default {
        components: {   
            QuillEditor,
        },
        setup () {
            const state = reactive({
                content : '',
            });
            return {state}
        }
    } 

</script>

<style lang="scss" scoped>

</style>