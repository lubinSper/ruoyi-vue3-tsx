// <script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// </script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup(){
    return ()=>{
      return(
        <>
          <div>tsx的初始化初始化</div>
          <HelloWorld msg="Hello World"></HelloWorld>
        </>

      )
    }
  }
})
