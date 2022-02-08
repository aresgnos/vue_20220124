<template>
    <div>

    </div>
</template>


<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { nextTick, onMounted } from 'vue';
    export default {
        setup () {
            const router = useRouter();
            const store = useStore();

            onMounted ( async () => { // F5 새로고침
                nextTick(()=> { // 화면 랜더링 완료후(타이밍을 늦춤)
                sessionStorage.removeItem("TOKEN");
                alert('로그아웃되었습니다.');

                // 1. 주소창만 바뀜
                router.push({name:"Home"});

                // 2. 메뉴 활성화
                store.commit("setMenu", "/");

                // 3. 로그인 상태
                store.commit("setLogged", false);
            })
        });
        
        return {}

        }
    }

</script>


<style lang="scss" scoped>

</style>