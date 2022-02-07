import { createApp } from 'vue'
import App from './App.vue'

//router 설정
import routes from './routes/index.js';

//stores 설정
import stores from './stores/index.js';


//element-plus 설정 (최신버전인 1.3 버전 말고(remove) 1.2버전 받음.)
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';


//1. 객체생성
const app = createApp(App);

//2. 여기에 필요한 라이브러리 설정하기
app.use(routes);
app.use(stores);
app.use(ElementPlus);
app.use(CKEditor);


//3. 마운트
app.mount('#app');