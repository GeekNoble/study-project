<template>
  <div>“喂你好，是尼克陈吗？我是叮咚买菜的送菜员，由于您电话打不通，
	特意在页面里跟您说一声，您菜到家了。”</div>

  <p>state.count: {{state.count}}</p>
  <p>state.name: {{state.name}}</p>
  <p>state.name2: {{state.name2 && state.name2.b}}</p>
  <homeVue :name2="name2" @homeClick="homeClick" class="test" ref="homeTest">
    <div>
      <br/>
      这是slot
    </div>
  </homeVue>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import homeVue from './component/home.vue'
 
const testFunction = () => {
  console.log('滚!!!')
}

let name2 = ref('homeVue')
let homeTest = ref(null)
const homeClick = (value) => {
  console.log(value)
  name2.value = '点击了homeVue'
}

onMounted(() => {
  console.log(homeTest.value)    // 组件实例

})
// let state = reactive({
//   count: 2,
//   name: 'kjl'
// })
let state = reactive({})

setTimeout(() => {
  let ka = {
    count: 192,
    name: 'skdj',
    name2: {
      a: '112',
      b: 'xxx'
    }
  }
  
  Object.assign(state, ka)
  name2.value = '改变了props'
}, 1000)

setTimeout(() => {
  state.count++
  state.name = 'sdj',
  state.name2.b = 'kskl'
}, 2000)
// return {
//   state,
//   testFunction
// }
</script>

<style>
div {
  color: yellowgreen;
}
</style>