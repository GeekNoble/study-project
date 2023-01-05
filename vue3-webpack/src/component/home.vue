<template>
	<!-- <div class="box1" @click="$emit('homeClick')"> -->
	<div class="box1" @click="fnClick" v-bind="$attrs">
    <p>{{name}}</p>
    <slot></slot>
    传入的props: {{name2}}
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

let name = 'jksd'
let homeValue = ref('子组件值')
let { name2 } = defineProps({ name2: String })
const emit =  defineEmits(['homeClick'])   // 传递emit事件

const fnClick = () => {
  emit('homeClick', {
    ka: homeValue
  })
}
console.log(name2)
onMounted(() => {
  // console.log('test1')
})

// setup模式时需要用defineExpose将公用方法导出
defineExpose({
  name,
  fnClick
})

// return {
//   name
// }
  
</script>

<style>
.box1 {
  background: yellow;
}
</style>