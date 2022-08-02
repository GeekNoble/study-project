<template>
	<div class="box1">
    <p>{{name}}</p>
  </div>
</template>
<script>
import { onMounted } from 'vue'

export default {
  setup() {
    let name = 'b首页'
    onMounted(() => {
      console.log('b首页')
    })

    
    return {
      name
    }
  }
  
}
</script>

<style>
.box1 {
  background: yellow;
}
</style>