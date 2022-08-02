<template>
	<div class="box1">
    <router-link v-for="(item, index) in name" :key="item.name" :to="item.url">
      <a-button > {{item.name}}</a-button>
    </router-link>

  <router-view></router-view>

  </div>
</template>
<script>
import { onMounted } from 'vue'
// import { useRouter } from 'vue-loader'
export default {
  setup() {
    let name = [
      { name: 'a2页面', url: '/a1/a2'}, 
      { name:'a3页面', url: '/a1/a3'}
    ]
    onMounted(() => {
      console.log('test1')
    })

    // //初始化路由
    // const router = useRouter();
    
    // const goRouter = (index) => {
    //   if(index == 0) {
    //     router.push('/a1/a2')
    //   } else {
    //     router.push('/a1/a3')
    //   }
    // }
    return {
      name,
      // goRouter
    }
  }
  
}
</script>

<style scoped>
.box1 {
  background: yellow;
}
</style>