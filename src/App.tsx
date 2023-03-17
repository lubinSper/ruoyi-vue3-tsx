import { defineComponent } from 'vue'

export default defineComponent({
  setup(){
    return ()=>{
      return(
        <>
          <router-view></router-view>
        </>

      )
    }
  }
})
