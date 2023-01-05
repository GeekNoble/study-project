<template>
	<div class="box1">
    <a-progress type="circle" :percent="75" />
    <a-progress type="circle" :percent="70" status="exception" />
    <a-progress type="circle" :percent="100" />

    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <!-- <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template> -->
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

  <h2>测试插件</h2>
  <photo-provider>
    <photo-consumer v-for="src in imgList" :intro="src" :key="src" :src="src">
      <img :src="src" class="view-box">
    </photo-consumer>
  </photo-provider>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { PhotoConsumer, PhotoProvider } from 'vue3-photo-preview'

const data = [{
  title: 'Ant Design Title 1',
}, {
  title: 'Ant Design Title 2',
}, {
  title: 'Ant Design Title 3',
}, {
  title: 'Ant Design Title 4',
}];

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
    return {
      data,
      imgList
    };
  },

});
</script>
<style scoped>
.box {
  color: red;
}
</style>