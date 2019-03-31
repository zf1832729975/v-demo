<template>
  <div id="app">
    <!-- <AddBolg /> -->
    <!-- <ShowBolgs /> -->
    <BlogHeader />
    <transition >
      <!-- 加上 keep-alive 可以保持路由切换的状态，避免每次请求 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import AddBolg from './components/add-blog'
import ShowBolgs from './components/show-blogs'
import BlogHeader from './components/blog-header'
import Translate from './components/translate'
export default {
  name: 'App',
  components: {
    AddBolg,
    ShowBolgs,
    BlogHeader,
    Translate
  }
}
</script>
<style>
#app{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9f9f9;
}
/* Animation
------------------------------ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
