<template>
	<div class="box1">
    <p>{{name}}</p>
  </div>
</template>
<script>
import { onMounted } from 'vue'

export default {
  setup() {
    let name = 'jksd'
    onMounted(() => {
      console.log('test1')
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