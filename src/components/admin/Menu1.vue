<template>
    <div>
        <h3>Menu1.vue</h3>
        {{props}}
        <button @click="handleCount">부모 메소드 호출 후 값증가</button>
        <el-button type="primary">Primary</el-button>
    
    </div>
</template>

<script>
export default {
    //부모 컴포넌트에서 전달되는 값을 보관
    props : {
        title : String,
        count : Number,
    },

    setup (props, {emit}) {
        console.log(props.title);
        const handleCount = () => {
            //부모의 @handleCount="실제호출메소드"가 반응
            emit('handleCount', {});
        };



        return {props, handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>