<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>

  <photo-provider>
    <photo-consumer v-for="src in imgList" :intro="src" :key="src" :src="src">
      <img :src="src" class="view-box">
    </photo-consumer>
  </photo-provider>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import { PhotoConsumer, PhotoProvider } from 'vue3-photo-preview'

const imgList = [
  'https://namewjp.github.io/vue3-photo-preview/static/media/1.95c72610.jpg',
  'https://namewjp.github.io/vue3-photo-preview/static/media/2.2d14a795.jpg',
  'https://namewjp.github.io/vue3-photo-preview/static/media/3.e6770b67.jpg',
  'https://namewjp.github.io/vue3-photo-preview/static/media/4.8fc09ded.png'
]
export default defineComponent({
  components: {
    PhotoConsumer,
    PhotoProvider
  },
  setup() {
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
    const activeKey = ref(['1']);
    watch(activeKey, val => {
      console.log(val);
    });
    return {
      text,
      activeKey,
      imgList
    };
  },

});
</script>
<style scoped>
.box2 {
  color: red;
}
</style>