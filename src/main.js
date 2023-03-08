import { createApp } from 'vue'
import App from './App'
import router from './router' // index는 생략이 가능함

const app = createApp(App)
app.use(router)

app.mount('#app')
